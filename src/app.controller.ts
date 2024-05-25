import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EntityManager } from 'typeorm';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly entityManager: EntityManager,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get('/migrate')
  // async migrateData(): Promise<string> {
  //   try {
  //     const responseFromMigrationEndpoint = await axios.get(
  //       'https://qreates.app/api/users/migrate.php?id=all',
  //     );
  //
  //     const usersData = responseFromMigrationEndpoint.data;
  //
  //     for (const userData of usersData) {
  //       const user = new User();
  //
  //       user.email = userData.email;
  //       user.name = userData.name;
  //       user.lastName = userData.lastName;
  //       user.username = userData.username;
  //       user.password = userData.password;
  //       user.resetPasswordToken = userData.resetPasswordToken;
  //       user.role = userData.role;
  //       user.status = userData.status;
  //       user.dateOfCreation = new Date(userData.dateOfCreation);
  //       user.token = userData.token;
  //       user.phone = userData.phone;
  //       user.companyName = userData.companyName;
  //       user.brandName = userData.brandName;
  //       user.webSite = userData.webSite;
  //       user.labels = [];
  //
  //       const savedUser = await this.entityManager.save(user);
  //
  //       for (const productData of userData.products) {
  //         const product = new Product();
  //
  //         product.state = productData.state;
  //         product.images = productData.images;
  //         product.labelImages = productData.labelImages;
  //         product.name = productData.name;
  //         product.model = productData.model;
  //         product.embedding = productData.embedding;
  //         product.delta = productData.delta;
  //         product.bias = productData.bias;
  //         product.loraPath = productData.loraPath;
  //         product.loraTriggerWord = productData.loraTriggerWord;
  //         product.user = [savedUser];
  //
  //         await this.entityManager.save(product);
  //       }
  //     }
  //     return 'Migration completed successfully';
  //   } catch (error) {
  //     this.logger.error(`Error during migration: ${error.message}`);
  //     throw error;
  //   }
  // }
}
