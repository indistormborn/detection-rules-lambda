import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  checkPath,
  httpErrorToLambdaResponse,
  httpResponseToLambdaResponse,
  parseStringToJson,
} from 'common/Utils';
import { CategorizeBody, CreateProfileDataBody } from 'contracts/server/Http';
import {
  Categorization,
  ProfileAnalysisGeneration,
  ProfileDataGeneration,
} from './factory';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { path, pathParameters, body, httpMethod, queryStringParameters } =
    event;

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.info(`[${new Date().toISOString()}] ${httpMethod} ${path}`);

  try {
    if (httpMethod === 'POST' && checkPath(path, 'categorize')) {
      const parsedBody = parseStringToJson<CategorizeBody>(body);
      const result = await Categorization.handle({ body: parsedBody });
      return httpResponseToLambdaResponse(result);
    } else if (httpMethod === 'POST' && checkPath(path, 'data')) {
      const parsedBody = parseStringToJson<CreateProfileDataBody>(body);
      const result = await ProfileDataGeneration.handle({ body: parsedBody });
      return httpResponseToLambdaResponse(result);
    } else if (httpMethod === 'GET' && checkPath(path, 'analysis')) {
      const { username } = pathParameters || {};
      const { force } = queryStringParameters || {};
      const result = await ProfileAnalysisGeneration.handle({
        params: { username },
        query: { force },
      });
      return httpResponseToLambdaResponse(result);
    }
  } catch (error) {
    console.error('Error:', error);
    return httpErrorToLambdaResponse(error);
  }
};
