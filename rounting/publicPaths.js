const Joi = require('joi');

var registerPaths = (server) => {
    server.route({
        method: 'GET',
        path: '/courses',
        handler: function (request, reply) {
            reply("get /courses").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Get all courses',
            validate: {
              query: {
                  now: Joi.boolean(),
                  from: Joi.date(),
                  to: Joi.date()
              }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/course/{course_id}',
        handler: function (request, reply) {
            reply("get /courses/"+request.params.course_id).code(200);
        },
        config: {
            tags: ['api'],
            description: 'Get a course with a certain id',
            validate: {
                query: {
                    now: Joi.boolean(),
                    from: Joi.date(),
                    to: Joi.date()
                },
                params: {
                    course_id: Joi.string()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/categories',
        handler: function (request, reply) {
            reply("get /categories").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets all the categories',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/categories/{category_id}',
        handler: function (request, reply) {
            reply("get /courses/"+request.params.category_id).code(200);
        },
        config: {
            tags: ['api'],
            description: 'Get a course with a certain id',
            validate: {
                query: {
                    now: Joi.boolean(),
                    from: Joi.date(),
                    to: Joi.date()
                },
                params: {
                    category_id: Joi.string()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/universities',
        handler: function (request, reply) {
            reply("get /universities").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets all universities',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/universities/courses',
        handler: function (request, reply) {
            reply("get /universities").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets all courses of all universities',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/university/{university_id}/courses',
        handler: function (request, reply) {
            reply("get /universities").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets all courses of a specified university',
            validate: {
                query: {
                    now: Joi.boolean(),
                    from: Joi.date(),
                    to: Joi.date()
                },
                params: {
                    university_id: Joi.string()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/university/{university_id}/categories',
        handler: function (request, reply) {
            reply("get /universities").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets all the categories of a specified university',
            validate: {
                params: {
                    university_id: Joi.string()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/university/{university_id}/category/{category_id}',
        handler: function (request, reply) {
            reply("get /universities").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets all courses of a certain category from a given university',
            validate: {
                query: {
                    now: Joi.boolean(),
                    from: Joi.date(),
                    to: Joi.date()
                },
                params: {
                    university_id: Joi.string(),
                    category_id: Joi.string()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/university/{university_id}/course/{course_id}',
        handler: function (request, reply) {
            reply("get /universities").code(200);
        },
        config: {
            tags: ['api'],
            description: 'Gets a certain course form a given university',
            validate: {
                query: {
                    now: Joi.boolean(),
                    from: Joi.date(),
                    to: Joi.date()
                },
                params: {
                    university_id: Joi.string(),
                    course_id: Joi.string()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success'
                        }
                    }
                }
            }
        }
    });
}

module.exports = registerPaths;