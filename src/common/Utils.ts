import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpResponse, IHttpError } from 'contracts/server/Http';

export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

export function parseStringToJson<T>(value: string): T {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {} as T;
  }
}

export function checkPath(fullPath: string, target: string): boolean {
  return fullPath.split('/').includes(target);
}

export function httpResponseToLambdaResponse(
  response: HttpResponse,
): APIGatewayProxyResult {
  return {
    statusCode: response.status,
    body: JSON.stringify(response.body),
  };
}

export function httpErrorToLambdaResponse(
  error: IHttpError,
): APIGatewayProxyResult {
  return {
    statusCode: error.status,
    body: JSON.stringify({ message: error.message }),
  };
}
