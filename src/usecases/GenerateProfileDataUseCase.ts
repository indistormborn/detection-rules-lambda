import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { ProfileData } from 'entities/ProfileData';
import { ProfileDataService } from 'services/ProfileDataService';
import { TwitterIntegrationService } from 'integrations/twitter-integration/TwitterIntegrationService';

export class GenerateProfileDataUseCase implements BaseUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly profileDataService: ProfileDataService) {}

  async execute(input: {
    username?: string;
    id?: string;
    force?: boolean;
  }): Promise<ProfileData> {
    try {
      const { force } = input;
      const userData = await TwitterIntegrationService.getUserData(input);

      const profileData = new ProfileData({
        name: userData.name,
        username: userData.username,
        description: userData.description,
        location: userData.location,
        nTweet: userData.nTweets,
        nFollower: userData.nFollowers,
        nFollowing: userData.nFollowing,
        tweets: userData.sampleTimeline,
        createdAt: userData.accountCreatedAt,
      });

      const profileDataExists = await this.profileDataService.exists(
        userData.username,
      );

      if (!force && profileDataExists) return profileData;

      await this.profileDataService.create(profileData);
      return profileData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
