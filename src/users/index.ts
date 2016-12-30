import * as Hapi from "hapi";
import Routes from "./routes";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import {UserModel} from './user';

export function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
    Routes(server, configs, database);

    // create a default admin user if it doesn't already exist
    UserModel.findOne({email: 'admin@example.com'}).then((user) => {
      if (!!user) {
        console.log('admin user exists');
      } else {
        console.log('creating admin user');

        UserModel.create([{
          email: 'admin@example.com',
          password: 'admin',
          name: 'admin'
        }]).then((user) => {
          console.log('created admin user');
        }).catch((err) => {
          console.error('error creating admin user', err);
        });
      }
    }).catch((err) => {
      console.error('error looking up admin user', err);
    });
}
