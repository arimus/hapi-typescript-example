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
        //console.log('admin user exists');
      } else {
        console.log('Creating default user');

        UserModel.create([{
          email: 'admin@example.com',
          password: 'admin',
          name: 'admin'
        }]).then((user) => {
          console.log('Created default user');
        }).catch((err) => {
          console.error('Error creating default user', err);
        });
      }
    }).catch((err) => {
      console.error('Error looking up default user', err);
    });
}
