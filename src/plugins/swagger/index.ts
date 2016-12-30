import {IPlugin, IPluginInfo} from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
          return new Promise<void>(resolve => {
            server.register([
                require('inert'),
                require('vision'),
                {
                  register: require('hapi-swagger'),
                  options: {
                    info: {
                      title: 'Task Api',
                      description: 'Task Api Documentation',
                      version: '1.0'
                    },
                    tags: [
                      {
                        'name': 'tasks',
                        'description': 'Api tasks interface.'
                      },
                      {
                        'name': 'users',
                        'description': 'Api users interface.'
                      }
                    ],
                    documentationPath: '/docs',
                    securityDefinitions: {
                      'jwt': {
                        'type': 'apiKey',
                        'name': 'Authorization',
                        'in': 'header'
                      }
                    },
                    security: [{'jwt': []}],
                  }
                }
              ]
              , (error) => {
                if (error) {
                  console.log('error', error);
                }

                resolve();
              });
          });
        },
        info: () => {
            return {
                name: "Swagger Documentation",
                version: "1.0.0"
            };
        }
    };
};
