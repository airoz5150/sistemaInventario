import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Aquí se eliminan las opciones deprecated y se agregan nuevas configuraciones de tiempo de espera
    const opts = {
      connectTimeoutMS: 30000,  // Tiempo máximo para la conexión (30 segundos)
      socketTimeoutMS: 30000,   // Tiempo máximo para recibir una respuesta (30 segundos)
      serverSelectionTimeoutMS: 5000,  // Tiempo para encontrar el servidor adecuado (5 segundos)
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
