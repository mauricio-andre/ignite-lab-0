import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { DatabaseModule } from '../database/database.module';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesResolver,
    CoursesService,
    EnrollmentsResolver,
    EnrollmentsService,
    StudentResolver,
    StudentsService,
  ],
})
export class HttpModule {}
