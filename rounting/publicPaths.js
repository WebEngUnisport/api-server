const Joi = require('joi');
const Mongoose = require('mongoose');

var Course = Mongoose.model('Course');
var Category = Mongoose.model('Category');
var University = Mongoose.model('University');

var registerPaths = (server) => {
    server.route({
        method: 'GET',
        path: '/courses',
        handler: function (request, reply) {
            Course.find({}, function (err, courses) {
                if(err){
                    reply({"error": "Problem with the courses"}).code(500);
                } else {
                    reply(courses).code(200);
                }
            });
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
            Course.findById(request.params.course_id, function (err, course) {
                if (err) {
                    reply({"error": "There is no course with the given id"}).code(404);
                } else {
                    reply(course).code(200);
                }
            })
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
            reply(Category.find()).code(200)
            //reply("get /categories").code(200);
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
            Course.find({'category.Code':request.params.category_id},'sport university.Code activity',function(err, docs){
                reply(docs).code(200);
            });
            //reply("get /courses/"+request.params.category_id).code(200);
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
            reply(University.find()).code(200)
            //reply("get /universities").code(200);
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