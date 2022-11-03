import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// const SOFT_DELETE_MODELS = ['Project', 'User'];

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // Soft Delete Middleware
    // this.$use(async (params, next) => {
    //   if (SOFT_DELETE_MODELS.includes(params.model)) {
    //     if (params.action == 'delete') {
    //       // Change action to an update
    //       params.action = 'update';
    //       params.args['data'] = { deleted: true };
    //     }
    //     if (params.action == 'deleteMany') {
    //       // Delete many queries
    //       params.action = 'updateMany';
    //       if (params.args.data != undefined) {
    //         params.args.data['deleted'] = true;
    //       } else {
    //         params.args['data'] = { deleted: true };
    //       }
    //     }

    //     if (params.action == 'findUnique') {
    //       // Change to findFirst - you cannot filter
    //       // by anything except ID / unique with findUnique
    //       params.action = 'findFirst';
    //       // Add 'deleted' filter
    //       // ID filter maintained
    //       params.args.where['deleted'] = false;
    //     }
    //     if (params.action == 'update') {
    //       // Change to updateMany - you cannot filter
    //       // by anything except ID / unique with findUnique
    //       params.action = 'updateMany';
    //       // Add 'deleted' filter
    //       // ID filter maintained
    //       params.args.where['deleted'] = false;
    //     }
    //     if (
    //       ['count', 'aggregate', 'updateMany', 'findMany'].includes(
    //         params.action,
    //       )
    //     ) {
    //       if (params.args.where != undefined) {
    //         if (params.args.where.deleted === undefined) {
    //           // Exclude deleted records if they have not been explicitly requested
    //           params.args.where['deleted'] = false;
    //         }
    //       } else {
    //         params.args['where'] = { deleted: false };
    //       }
    //     }
    //   }
    //   return next(params);
    // });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
