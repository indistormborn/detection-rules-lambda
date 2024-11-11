import { CreateProfileData } from 'controllers/CreateProfileData';
import { GenerateProfileDataUseCase } from 'usecases/GenerateProfileDataUseCase';
import { ProfileDataService } from 'services/ProfileDataService';
import { CreateProfileAnalysis } from 'controllers/CreateProfileAnalysis';
import { GenerateProfileAnalysisUseCase } from 'usecases/GenerateProfileAnalysisUseCase';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';
import { CategorizationConfigService } from 'services/CategorizationConfigService';
import { CategorizationUseCase } from 'usecases/CategorizationUseCase';
import { Categorize } from 'controllers/Categorize';

export const Categorization = new Categorize(
  new CategorizationUseCase(
    new CategorizationConfigService(),
    new GenerateProfileDataUseCase(new ProfileDataService()),
    new GenerateProfileAnalysisUseCase(
      new ProfileDataService(),
      new ProfileAnalysisService(),
    ),
    new ProfileAnalysisService(),
  ),
);

export const ProfileDataGeneration = new CreateProfileData(
  new GenerateProfileDataUseCase(new ProfileDataService()),
);

export const ProfileAnalysisGeneration = new CreateProfileAnalysis(
  new GenerateProfileAnalysisUseCase(
    new ProfileDataService(),
    new ProfileAnalysisService(),
  ),
);
