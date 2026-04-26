import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user?.email || 'anonymous';
    const method = request.method;
    const path = request.url;
    const payload = request.body;

    const started = Date.now();
    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - started;
        console.log(`[AUDIT] ${method} ${path} by ${user} ${elapsed}ms`, {
          payload,
        });
      }),
    );
  }
}
