import { HttpError } from 'common/errors/HttpError';
import { BaseController } from 'contracts/controllers/BaseController';
import { CategorizeRequest, HttpResponse } from 'contracts/server/Http';
import { logger } from 'infra/logger';
import { CategorizationUseCase } from 'usecases/CategorizationUseCase';

export class Categorize implements BaseController {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly useCase: CategorizationUseCase) {}

  async handle(request: CategorizeRequest): Promise<HttpResponse> {
    try {
      const { body } = request;
      const { username, id, force } = body;

      const analysis = await this.useCase.execute({ username, id, force });

      return {
        status: 200,
        body: analysis,
      };
    } catch (error) {
      logger.error(error);

      throw new HttpError({
        message: `Falha ao categorizar: ${error.message}`,
        status: error.status || 500,
      });
    }
  }
}
