require('dotenv').config();

if (process.env.NODE_ENV === 'prod') {
  exports.PORT = process.env.PORT || 80;
  exports.API_URL = process.env.API_URL;
  exports.CLIENT_URL = process.env.CLIENT_URL;
  exports.MONGO_URI = process.env.MONGO_URI;
  exports.G_CLIENT_SECRET = process.env.G_CLIENT_SECRET;
  exports.G_CLIENT_ID = process.env.G_CLIENT_ID;

  exports.cookie = {
    secret: 'Session Secret',
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 100,
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  };
}

if (process.env.NODE_ENV === 'dev') {
  exports.PORT = process.env.PORT || 5000;
  exports.API_URL = 'http://localhost:' + this.PORT;
  exports.CLIENT_URL = 'http://localhost:3000';
  exports.MONGO_URI = 'mongodb://localhost:27017/buzz';
  exports.G_CLIENT_SECRET = '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';
  exports.G_CLIENT_ID =
    '717881550020-ggjt3glgp3i5ulp2kmi432i5mlfcm44g.apps.googleusercontent.com';

  exports.cookie = {
    secret: 'Session Secret',
    resave: true,
    saveUninitialized: true,
  };
}

if (process.env.NODE_ENV === 'test') {
  exports.PORT = process.env.PORT || 5000;
  exports.API_URL = 'http://localhost:' + this.PORT;
  exports.CLIENT_URL = 'http://localhost:3000';
  exports.MONGO_URI =
    'mongodb+srv://Mayank:6yhn&UJM@ttncluster.fwirc.mongodb.net/buzz?retryWrites=true&w=majority';
  exports.G_CLIENT_SECRET = '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';
  exports.G_CLIENT_ID =
    '717881550020-ggjt3glgp3i5ulp2kmi432i5mlfcm44g.apps.googleusercontent.com';

  exports.cookie = {
    secret: 'Session Secret',
    resave: true,
    saveUninitialized: true,
  };
}
