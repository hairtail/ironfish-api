/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import joi from 'joi';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from '../events/events.module';
import { EventsRestModule } from '../events/events-rest.module';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';

export async function bootstrapTestApp(): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    imports: [
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: joi.object({
          DATABASE_URL: joi.string().required(),
          IRONFISH_API_KEY: joi.string().required(),
        }),
      }),
      EventsModule,
      EventsRestModule,
      HealthModule,
      UsersModule,
    ],
  }).compile();

  return module.createNestApplication();
}
