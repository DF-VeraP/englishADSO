
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Curso
 * 
 */
export type Curso = $Result.DefaultSelection<Prisma.$CursoPayload>
/**
 * Model Modulo
 * 
 */
export type Modulo = $Result.DefaultSelection<Prisma.$ModuloPayload>
/**
 * Model Momento
 * 
 */
export type Momento = $Result.DefaultSelection<Prisma.$MomentoPayload>
/**
 * Model Actividad
 * 
 */
export type Actividad = $Result.DefaultSelection<Prisma.$ActividadPayload>
/**
 * Model ProgresoActividad
 * 
 */
export type ProgresoActividad = $Result.DefaultSelection<Prisma.$ProgresoActividadPayload>
/**
 * Model InsigniaAprendiz
 * 
 */
export type InsigniaAprendiz = $Result.DefaultSelection<Prisma.$InsigniaAprendizPayload>
/**
 * Model TestResultado
 * 
 */
export type TestResultado = $Result.DefaultSelection<Prisma.$TestResultadoPayload>
/**
 * Model Inscripcion
 * 
 */
export type Inscripcion = $Result.DefaultSelection<Prisma.$InscripcionPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Notificacion
 * 
 */
export type Notificacion = $Result.DefaultSelection<Prisma.$NotificacionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.curso`: Exposes CRUD operations for the **Curso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cursos
    * const cursos = await prisma.curso.findMany()
    * ```
    */
  get curso(): Prisma.CursoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.modulo`: Exposes CRUD operations for the **Modulo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Modulos
    * const modulos = await prisma.modulo.findMany()
    * ```
    */
  get modulo(): Prisma.ModuloDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.momento`: Exposes CRUD operations for the **Momento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Momentos
    * const momentos = await prisma.momento.findMany()
    * ```
    */
  get momento(): Prisma.MomentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actividad`: Exposes CRUD operations for the **Actividad** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Actividads
    * const actividads = await prisma.actividad.findMany()
    * ```
    */
  get actividad(): Prisma.ActividadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progresoActividad`: Exposes CRUD operations for the **ProgresoActividad** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgresoActividads
    * const progresoActividads = await prisma.progresoActividad.findMany()
    * ```
    */
  get progresoActividad(): Prisma.ProgresoActividadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.insigniaAprendiz`: Exposes CRUD operations for the **InsigniaAprendiz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InsigniaAprendizs
    * const insigniaAprendizs = await prisma.insigniaAprendiz.findMany()
    * ```
    */
  get insigniaAprendiz(): Prisma.InsigniaAprendizDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testResultado`: Exposes CRUD operations for the **TestResultado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestResultados
    * const testResultados = await prisma.testResultado.findMany()
    * ```
    */
  get testResultado(): Prisma.TestResultadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inscripcion`: Exposes CRUD operations for the **Inscripcion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inscripcions
    * const inscripcions = await prisma.inscripcion.findMany()
    * ```
    */
  get inscripcion(): Prisma.InscripcionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificacion`: Exposes CRUD operations for the **Notificacion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notificacions
    * const notificacions = await prisma.notificacion.findMany()
    * ```
    */
  get notificacion(): Prisma.NotificacionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Curso: 'Curso',
    Modulo: 'Modulo',
    Momento: 'Momento',
    Actividad: 'Actividad',
    ProgresoActividad: 'ProgresoActividad',
    InsigniaAprendiz: 'InsigniaAprendiz',
    TestResultado: 'TestResultado',
    Inscripcion: 'Inscripcion',
    AuditLog: 'AuditLog',
    Notificacion: 'Notificacion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "curso" | "modulo" | "momento" | "actividad" | "progresoActividad" | "insigniaAprendiz" | "testResultado" | "inscripcion" | "auditLog" | "notificacion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Curso: {
        payload: Prisma.$CursoPayload<ExtArgs>
        fields: Prisma.CursoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CursoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CursoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          findFirst: {
            args: Prisma.CursoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CursoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          findMany: {
            args: Prisma.CursoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          create: {
            args: Prisma.CursoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          createMany: {
            args: Prisma.CursoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CursoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          delete: {
            args: Prisma.CursoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          update: {
            args: Prisma.CursoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          deleteMany: {
            args: Prisma.CursoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CursoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CursoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          upsert: {
            args: Prisma.CursoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          aggregate: {
            args: Prisma.CursoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurso>
          }
          groupBy: {
            args: Prisma.CursoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CursoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CursoCountArgs<ExtArgs>
            result: $Utils.Optional<CursoCountAggregateOutputType> | number
          }
        }
      }
      Modulo: {
        payload: Prisma.$ModuloPayload<ExtArgs>
        fields: Prisma.ModuloFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuloFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuloFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>
          }
          findFirst: {
            args: Prisma.ModuloFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuloFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>
          }
          findMany: {
            args: Prisma.ModuloFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>[]
          }
          create: {
            args: Prisma.ModuloCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>
          }
          createMany: {
            args: Prisma.ModuloCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModuloCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>[]
          }
          delete: {
            args: Prisma.ModuloDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>
          }
          update: {
            args: Prisma.ModuloUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>
          }
          deleteMany: {
            args: Prisma.ModuloDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModuloUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModuloUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>[]
          }
          upsert: {
            args: Prisma.ModuloUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuloPayload>
          }
          aggregate: {
            args: Prisma.ModuloAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModulo>
          }
          groupBy: {
            args: Prisma.ModuloGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModuloGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuloCountArgs<ExtArgs>
            result: $Utils.Optional<ModuloCountAggregateOutputType> | number
          }
        }
      }
      Momento: {
        payload: Prisma.$MomentoPayload<ExtArgs>
        fields: Prisma.MomentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MomentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MomentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>
          }
          findFirst: {
            args: Prisma.MomentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MomentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>
          }
          findMany: {
            args: Prisma.MomentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>[]
          }
          create: {
            args: Prisma.MomentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>
          }
          createMany: {
            args: Prisma.MomentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MomentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>[]
          }
          delete: {
            args: Prisma.MomentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>
          }
          update: {
            args: Prisma.MomentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>
          }
          deleteMany: {
            args: Prisma.MomentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MomentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MomentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>[]
          }
          upsert: {
            args: Prisma.MomentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MomentoPayload>
          }
          aggregate: {
            args: Prisma.MomentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMomento>
          }
          groupBy: {
            args: Prisma.MomentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MomentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MomentoCountArgs<ExtArgs>
            result: $Utils.Optional<MomentoCountAggregateOutputType> | number
          }
        }
      }
      Actividad: {
        payload: Prisma.$ActividadPayload<ExtArgs>
        fields: Prisma.ActividadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActividadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActividadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          findFirst: {
            args: Prisma.ActividadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActividadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          findMany: {
            args: Prisma.ActividadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>[]
          }
          create: {
            args: Prisma.ActividadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          createMany: {
            args: Prisma.ActividadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActividadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>[]
          }
          delete: {
            args: Prisma.ActividadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          update: {
            args: Prisma.ActividadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          deleteMany: {
            args: Prisma.ActividadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActividadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActividadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>[]
          }
          upsert: {
            args: Prisma.ActividadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          aggregate: {
            args: Prisma.ActividadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActividad>
          }
          groupBy: {
            args: Prisma.ActividadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActividadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActividadCountArgs<ExtArgs>
            result: $Utils.Optional<ActividadCountAggregateOutputType> | number
          }
        }
      }
      ProgresoActividad: {
        payload: Prisma.$ProgresoActividadPayload<ExtArgs>
        fields: Prisma.ProgresoActividadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgresoActividadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgresoActividadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>
          }
          findFirst: {
            args: Prisma.ProgresoActividadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgresoActividadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>
          }
          findMany: {
            args: Prisma.ProgresoActividadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>[]
          }
          create: {
            args: Prisma.ProgresoActividadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>
          }
          createMany: {
            args: Prisma.ProgresoActividadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgresoActividadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>[]
          }
          delete: {
            args: Prisma.ProgresoActividadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>
          }
          update: {
            args: Prisma.ProgresoActividadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>
          }
          deleteMany: {
            args: Prisma.ProgresoActividadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgresoActividadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgresoActividadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>[]
          }
          upsert: {
            args: Prisma.ProgresoActividadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoActividadPayload>
          }
          aggregate: {
            args: Prisma.ProgresoActividadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgresoActividad>
          }
          groupBy: {
            args: Prisma.ProgresoActividadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgresoActividadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgresoActividadCountArgs<ExtArgs>
            result: $Utils.Optional<ProgresoActividadCountAggregateOutputType> | number
          }
        }
      }
      InsigniaAprendiz: {
        payload: Prisma.$InsigniaAprendizPayload<ExtArgs>
        fields: Prisma.InsigniaAprendizFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InsigniaAprendizFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InsigniaAprendizFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>
          }
          findFirst: {
            args: Prisma.InsigniaAprendizFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InsigniaAprendizFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>
          }
          findMany: {
            args: Prisma.InsigniaAprendizFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>[]
          }
          create: {
            args: Prisma.InsigniaAprendizCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>
          }
          createMany: {
            args: Prisma.InsigniaAprendizCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InsigniaAprendizCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>[]
          }
          delete: {
            args: Prisma.InsigniaAprendizDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>
          }
          update: {
            args: Prisma.InsigniaAprendizUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>
          }
          deleteMany: {
            args: Prisma.InsigniaAprendizDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InsigniaAprendizUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InsigniaAprendizUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>[]
          }
          upsert: {
            args: Prisma.InsigniaAprendizUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsigniaAprendizPayload>
          }
          aggregate: {
            args: Prisma.InsigniaAprendizAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInsigniaAprendiz>
          }
          groupBy: {
            args: Prisma.InsigniaAprendizGroupByArgs<ExtArgs>
            result: $Utils.Optional<InsigniaAprendizGroupByOutputType>[]
          }
          count: {
            args: Prisma.InsigniaAprendizCountArgs<ExtArgs>
            result: $Utils.Optional<InsigniaAprendizCountAggregateOutputType> | number
          }
        }
      }
      TestResultado: {
        payload: Prisma.$TestResultadoPayload<ExtArgs>
        fields: Prisma.TestResultadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestResultadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestResultadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>
          }
          findFirst: {
            args: Prisma.TestResultadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestResultadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>
          }
          findMany: {
            args: Prisma.TestResultadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>[]
          }
          create: {
            args: Prisma.TestResultadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>
          }
          createMany: {
            args: Prisma.TestResultadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestResultadoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>[]
          }
          delete: {
            args: Prisma.TestResultadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>
          }
          update: {
            args: Prisma.TestResultadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>
          }
          deleteMany: {
            args: Prisma.TestResultadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestResultadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestResultadoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>[]
          }
          upsert: {
            args: Prisma.TestResultadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultadoPayload>
          }
          aggregate: {
            args: Prisma.TestResultadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestResultado>
          }
          groupBy: {
            args: Prisma.TestResultadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestResultadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestResultadoCountArgs<ExtArgs>
            result: $Utils.Optional<TestResultadoCountAggregateOutputType> | number
          }
        }
      }
      Inscripcion: {
        payload: Prisma.$InscripcionPayload<ExtArgs>
        fields: Prisma.InscripcionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InscripcionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InscripcionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          findFirst: {
            args: Prisma.InscripcionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InscripcionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          findMany: {
            args: Prisma.InscripcionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          create: {
            args: Prisma.InscripcionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          createMany: {
            args: Prisma.InscripcionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InscripcionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          delete: {
            args: Prisma.InscripcionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          update: {
            args: Prisma.InscripcionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          deleteMany: {
            args: Prisma.InscripcionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InscripcionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InscripcionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          upsert: {
            args: Prisma.InscripcionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          aggregate: {
            args: Prisma.InscripcionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInscripcion>
          }
          groupBy: {
            args: Prisma.InscripcionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InscripcionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InscripcionCountArgs<ExtArgs>
            result: $Utils.Optional<InscripcionCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Notificacion: {
        payload: Prisma.$NotificacionPayload<ExtArgs>
        fields: Prisma.NotificacionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificacionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificacionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          findFirst: {
            args: Prisma.NotificacionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificacionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          findMany: {
            args: Prisma.NotificacionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>[]
          }
          create: {
            args: Prisma.NotificacionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          createMany: {
            args: Prisma.NotificacionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificacionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>[]
          }
          delete: {
            args: Prisma.NotificacionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          update: {
            args: Prisma.NotificacionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          deleteMany: {
            args: Prisma.NotificacionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificacionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificacionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>[]
          }
          upsert: {
            args: Prisma.NotificacionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacionPayload>
          }
          aggregate: {
            args: Prisma.NotificacionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificacion>
          }
          groupBy: {
            args: Prisma.NotificacionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificacionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificacionCountArgs<ExtArgs>
            result: $Utils.Optional<NotificacionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    curso?: CursoOmit
    modulo?: ModuloOmit
    momento?: MomentoOmit
    actividad?: ActividadOmit
    progresoActividad?: ProgresoActividadOmit
    insigniaAprendiz?: InsigniaAprendizOmit
    testResultado?: TestResultadoOmit
    inscripcion?: InscripcionOmit
    auditLog?: AuditLogOmit
    notificacion?: NotificacionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    cursosComoInstructor: number
    inscripciones: number
    auditLogs: number
    notificaciones: number
    progresoActividades: number
    insignias: number
    testResultados: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursosComoInstructor?: boolean | UserCountOutputTypeCountCursosComoInstructorArgs
    inscripciones?: boolean | UserCountOutputTypeCountInscripcionesArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    notificaciones?: boolean | UserCountOutputTypeCountNotificacionesArgs
    progresoActividades?: boolean | UserCountOutputTypeCountProgresoActividadesArgs
    insignias?: boolean | UserCountOutputTypeCountInsigniasArgs
    testResultados?: boolean | UserCountOutputTypeCountTestResultadosArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCursosComoInstructorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CursoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgresoActividadesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoActividadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInsigniasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsigniaAprendizWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTestResultadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestResultadoWhereInput
  }


  /**
   * Count Type CursoCountOutputType
   */

  export type CursoCountOutputType = {
    modulos: number
    inscripciones: number
  }

  export type CursoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modulos?: boolean | CursoCountOutputTypeCountModulosArgs
    inscripciones?: boolean | CursoCountOutputTypeCountInscripcionesArgs
  }

  // Custom InputTypes
  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CursoCountOutputType
     */
    select?: CursoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountModulosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuloWhereInput
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountInscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
  }


  /**
   * Count Type ModuloCountOutputType
   */

  export type ModuloCountOutputType = {
    momentos: number
  }

  export type ModuloCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    momentos?: boolean | ModuloCountOutputTypeCountMomentosArgs
  }

  // Custom InputTypes
  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloCountOutputType
     */
    select?: ModuloCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeCountMomentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MomentoWhereInput
  }


  /**
   * Count Type MomentoCountOutputType
   */

  export type MomentoCountOutputType = {
    actividades: number
  }

  export type MomentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actividades?: boolean | MomentoCountOutputTypeCountActividadesArgs
  }

  // Custom InputTypes
  /**
   * MomentoCountOutputType without action
   */
  export type MomentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MomentoCountOutputType
     */
    select?: MomentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MomentoCountOutputType without action
   */
  export type MomentoCountOutputTypeCountActividadesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActividadWhereInput
  }


  /**
   * Count Type ActividadCountOutputType
   */

  export type ActividadCountOutputType = {
    progresos: number
  }

  export type ActividadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progresos?: boolean | ActividadCountOutputTypeCountProgresosArgs
  }

  // Custom InputTypes
  /**
   * ActividadCountOutputType without action
   */
  export type ActividadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActividadCountOutputType
     */
    select?: ActividadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActividadCountOutputType without action
   */
  export type ActividadCountOutputTypeCountProgresosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoActividadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    correo_usuario: string | null
    passw_usuario: string | null
    nombre_usuario: string | null
    estado_usuario: boolean | null
    rol_usuario: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    correo_usuario: string | null
    passw_usuario: string | null
    nombre_usuario: string | null
    estado_usuario: boolean | null
    rol_usuario: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    correo_usuario: number
    passw_usuario: number
    nombre_usuario: number
    estado_usuario: number
    rol_usuario: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    correo_usuario?: true
    passw_usuario?: true
    nombre_usuario?: true
    estado_usuario?: true
    rol_usuario?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    correo_usuario?: true
    passw_usuario?: true
    nombre_usuario?: true
    estado_usuario?: true
    rol_usuario?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    correo_usuario?: true
    passw_usuario?: true
    nombre_usuario?: true
    estado_usuario?: true
    rol_usuario?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario: string | null
    estado_usuario: boolean
    rol_usuario: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    correo_usuario?: boolean
    passw_usuario?: boolean
    nombre_usuario?: boolean
    estado_usuario?: boolean
    rol_usuario?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cursosComoInstructor?: boolean | User$cursosComoInstructorArgs<ExtArgs>
    inscripciones?: boolean | User$inscripcionesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    notificaciones?: boolean | User$notificacionesArgs<ExtArgs>
    progresoActividades?: boolean | User$progresoActividadesArgs<ExtArgs>
    insignias?: boolean | User$insigniasArgs<ExtArgs>
    testResultados?: boolean | User$testResultadosArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    correo_usuario?: boolean
    passw_usuario?: boolean
    nombre_usuario?: boolean
    estado_usuario?: boolean
    rol_usuario?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    correo_usuario?: boolean
    passw_usuario?: boolean
    nombre_usuario?: boolean
    estado_usuario?: boolean
    rol_usuario?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    correo_usuario?: boolean
    passw_usuario?: boolean
    nombre_usuario?: boolean
    estado_usuario?: boolean
    rol_usuario?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "correo_usuario" | "passw_usuario" | "nombre_usuario" | "estado_usuario" | "rol_usuario" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursosComoInstructor?: boolean | User$cursosComoInstructorArgs<ExtArgs>
    inscripciones?: boolean | User$inscripcionesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    notificaciones?: boolean | User$notificacionesArgs<ExtArgs>
    progresoActividades?: boolean | User$progresoActividadesArgs<ExtArgs>
    insignias?: boolean | User$insigniasArgs<ExtArgs>
    testResultados?: boolean | User$testResultadosArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cursosComoInstructor: Prisma.$CursoPayload<ExtArgs>[]
      inscripciones: Prisma.$InscripcionPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      notificaciones: Prisma.$NotificacionPayload<ExtArgs>[]
      progresoActividades: Prisma.$ProgresoActividadPayload<ExtArgs>[]
      insignias: Prisma.$InsigniaAprendizPayload<ExtArgs>[]
      testResultados: Prisma.$TestResultadoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      correo_usuario: string
      passw_usuario: string
      nombre_usuario: string | null
      estado_usuario: boolean
      rol_usuario: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cursosComoInstructor<T extends User$cursosComoInstructorArgs<ExtArgs> = {}>(args?: Subset<T, User$cursosComoInstructorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inscripciones<T extends User$inscripcionesArgs<ExtArgs> = {}>(args?: Subset<T, User$inscripcionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificaciones<T extends User$notificacionesArgs<ExtArgs> = {}>(args?: Subset<T, User$notificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progresoActividades<T extends User$progresoActividadesArgs<ExtArgs> = {}>(args?: Subset<T, User$progresoActividadesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    insignias<T extends User$insigniasArgs<ExtArgs> = {}>(args?: Subset<T, User$insigniasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testResultados<T extends User$testResultadosArgs<ExtArgs> = {}>(args?: Subset<T, User$testResultadosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly correo_usuario: FieldRef<"User", 'String'>
    readonly passw_usuario: FieldRef<"User", 'String'>
    readonly nombre_usuario: FieldRef<"User", 'String'>
    readonly estado_usuario: FieldRef<"User", 'Boolean'>
    readonly rol_usuario: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cursosComoInstructor
   */
  export type User$cursosComoInstructorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    where?: CursoWhereInput
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    cursor?: CursoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * User.inscripciones
   */
  export type User$inscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    cursor?: InscripcionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.notificaciones
   */
  export type User$notificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    where?: NotificacionWhereInput
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    cursor?: NotificacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * User.progresoActividades
   */
  export type User$progresoActividadesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    where?: ProgresoActividadWhereInput
    orderBy?: ProgresoActividadOrderByWithRelationInput | ProgresoActividadOrderByWithRelationInput[]
    cursor?: ProgresoActividadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgresoActividadScalarFieldEnum | ProgresoActividadScalarFieldEnum[]
  }

  /**
   * User.insignias
   */
  export type User$insigniasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    where?: InsigniaAprendizWhereInput
    orderBy?: InsigniaAprendizOrderByWithRelationInput | InsigniaAprendizOrderByWithRelationInput[]
    cursor?: InsigniaAprendizWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InsigniaAprendizScalarFieldEnum | InsigniaAprendizScalarFieldEnum[]
  }

  /**
   * User.testResultados
   */
  export type User$testResultadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    where?: TestResultadoWhereInput
    orderBy?: TestResultadoOrderByWithRelationInput | TestResultadoOrderByWithRelationInput[]
    cursor?: TestResultadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestResultadoScalarFieldEnum | TestResultadoScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Curso
   */

  export type AggregateCurso = {
    _count: CursoCountAggregateOutputType | null
    _avg: CursoAvgAggregateOutputType | null
    _sum: CursoSumAggregateOutputType | null
    _min: CursoMinAggregateOutputType | null
    _max: CursoMaxAggregateOutputType | null
  }

  export type CursoAvgAggregateOutputType = {
    id: number | null
    instructorId: number | null
  }

  export type CursoSumAggregateOutputType = {
    id: number | null
    instructorId: number | null
  }

  export type CursoMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    descripcion: string | null
    nivel: string | null
    estado: boolean | null
    instructorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CursoMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    descripcion: string | null
    nivel: string | null
    estado: boolean | null
    instructorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CursoCountAggregateOutputType = {
    id: number
    titulo: number
    descripcion: number
    nivel: number
    estado: number
    instructorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CursoAvgAggregateInputType = {
    id?: true
    instructorId?: true
  }

  export type CursoSumAggregateInputType = {
    id?: true
    instructorId?: true
  }

  export type CursoMinAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    nivel?: true
    estado?: true
    instructorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CursoMaxAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    nivel?: true
    estado?: true
    instructorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CursoCountAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    nivel?: true
    estado?: true
    instructorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CursoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Curso to aggregate.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cursos
    **/
    _count?: true | CursoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CursoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CursoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CursoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CursoMaxAggregateInputType
  }

  export type GetCursoAggregateType<T extends CursoAggregateArgs> = {
        [P in keyof T & keyof AggregateCurso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurso[P]>
      : GetScalarType<T[P], AggregateCurso[P]>
  }




  export type CursoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CursoWhereInput
    orderBy?: CursoOrderByWithAggregationInput | CursoOrderByWithAggregationInput[]
    by: CursoScalarFieldEnum[] | CursoScalarFieldEnum
    having?: CursoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CursoCountAggregateInputType | true
    _avg?: CursoAvgAggregateInputType
    _sum?: CursoSumAggregateInputType
    _min?: CursoMinAggregateInputType
    _max?: CursoMaxAggregateInputType
  }

  export type CursoGroupByOutputType = {
    id: number
    titulo: string
    descripcion: string | null
    nivel: string
    estado: boolean
    instructorId: number
    createdAt: Date
    updatedAt: Date
    _count: CursoCountAggregateOutputType | null
    _avg: CursoAvgAggregateOutputType | null
    _sum: CursoSumAggregateOutputType | null
    _min: CursoMinAggregateOutputType | null
    _max: CursoMaxAggregateOutputType | null
  }

  type GetCursoGroupByPayload<T extends CursoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CursoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CursoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CursoGroupByOutputType[P]>
            : GetScalarType<T[P], CursoGroupByOutputType[P]>
        }
      >
    >


  export type CursoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    nivel?: boolean
    estado?: boolean
    instructorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instructor?: boolean | UserDefaultArgs<ExtArgs>
    modulos?: boolean | Curso$modulosArgs<ExtArgs>
    inscripciones?: boolean | Curso$inscripcionesArgs<ExtArgs>
    _count?: boolean | CursoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    nivel?: boolean
    estado?: boolean
    instructorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instructor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    nivel?: boolean
    estado?: boolean
    instructorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instructor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectScalar = {
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    nivel?: boolean
    estado?: boolean
    instructorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CursoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "descripcion" | "nivel" | "estado" | "instructorId" | "createdAt" | "updatedAt", ExtArgs["result"]["curso"]>
  export type CursoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instructor?: boolean | UserDefaultArgs<ExtArgs>
    modulos?: boolean | Curso$modulosArgs<ExtArgs>
    inscripciones?: boolean | Curso$inscripcionesArgs<ExtArgs>
    _count?: boolean | CursoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CursoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instructor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CursoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instructor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CursoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Curso"
    objects: {
      instructor: Prisma.$UserPayload<ExtArgs>
      modulos: Prisma.$ModuloPayload<ExtArgs>[]
      inscripciones: Prisma.$InscripcionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      descripcion: string | null
      nivel: string
      estado: boolean
      instructorId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["curso"]>
    composites: {}
  }

  type CursoGetPayload<S extends boolean | null | undefined | CursoDefaultArgs> = $Result.GetResult<Prisma.$CursoPayload, S>

  type CursoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CursoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CursoCountAggregateInputType | true
    }

  export interface CursoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Curso'], meta: { name: 'Curso' } }
    /**
     * Find zero or one Curso that matches the filter.
     * @param {CursoFindUniqueArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CursoFindUniqueArgs>(args: SelectSubset<T, CursoFindUniqueArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Curso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CursoFindUniqueOrThrowArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CursoFindUniqueOrThrowArgs>(args: SelectSubset<T, CursoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Curso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindFirstArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CursoFindFirstArgs>(args?: SelectSubset<T, CursoFindFirstArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Curso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindFirstOrThrowArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CursoFindFirstOrThrowArgs>(args?: SelectSubset<T, CursoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cursos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cursos
     * const cursos = await prisma.curso.findMany()
     * 
     * // Get first 10 Cursos
     * const cursos = await prisma.curso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cursoWithIdOnly = await prisma.curso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CursoFindManyArgs>(args?: SelectSubset<T, CursoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Curso.
     * @param {CursoCreateArgs} args - Arguments to create a Curso.
     * @example
     * // Create one Curso
     * const Curso = await prisma.curso.create({
     *   data: {
     *     // ... data to create a Curso
     *   }
     * })
     * 
     */
    create<T extends CursoCreateArgs>(args: SelectSubset<T, CursoCreateArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cursos.
     * @param {CursoCreateManyArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const curso = await prisma.curso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CursoCreateManyArgs>(args?: SelectSubset<T, CursoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cursos and returns the data saved in the database.
     * @param {CursoCreateManyAndReturnArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const curso = await prisma.curso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cursos and only return the `id`
     * const cursoWithIdOnly = await prisma.curso.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CursoCreateManyAndReturnArgs>(args?: SelectSubset<T, CursoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Curso.
     * @param {CursoDeleteArgs} args - Arguments to delete one Curso.
     * @example
     * // Delete one Curso
     * const Curso = await prisma.curso.delete({
     *   where: {
     *     // ... filter to delete one Curso
     *   }
     * })
     * 
     */
    delete<T extends CursoDeleteArgs>(args: SelectSubset<T, CursoDeleteArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Curso.
     * @param {CursoUpdateArgs} args - Arguments to update one Curso.
     * @example
     * // Update one Curso
     * const curso = await prisma.curso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CursoUpdateArgs>(args: SelectSubset<T, CursoUpdateArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cursos.
     * @param {CursoDeleteManyArgs} args - Arguments to filter Cursos to delete.
     * @example
     * // Delete a few Cursos
     * const { count } = await prisma.curso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CursoDeleteManyArgs>(args?: SelectSubset<T, CursoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cursos
     * const curso = await prisma.curso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CursoUpdateManyArgs>(args: SelectSubset<T, CursoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos and returns the data updated in the database.
     * @param {CursoUpdateManyAndReturnArgs} args - Arguments to update many Cursos.
     * @example
     * // Update many Cursos
     * const curso = await prisma.curso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cursos and only return the `id`
     * const cursoWithIdOnly = await prisma.curso.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CursoUpdateManyAndReturnArgs>(args: SelectSubset<T, CursoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Curso.
     * @param {CursoUpsertArgs} args - Arguments to update or create a Curso.
     * @example
     * // Update or create a Curso
     * const curso = await prisma.curso.upsert({
     *   create: {
     *     // ... data to create a Curso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Curso we want to update
     *   }
     * })
     */
    upsert<T extends CursoUpsertArgs>(args: SelectSubset<T, CursoUpsertArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoCountArgs} args - Arguments to filter Cursos to count.
     * @example
     * // Count the number of Cursos
     * const count = await prisma.curso.count({
     *   where: {
     *     // ... the filter for the Cursos we want to count
     *   }
     * })
    **/
    count<T extends CursoCountArgs>(
      args?: Subset<T, CursoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CursoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Curso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CursoAggregateArgs>(args: Subset<T, CursoAggregateArgs>): Prisma.PrismaPromise<GetCursoAggregateType<T>>

    /**
     * Group by Curso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CursoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CursoGroupByArgs['orderBy'] }
        : { orderBy?: CursoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CursoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCursoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Curso model
   */
  readonly fields: CursoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Curso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CursoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instructor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    modulos<T extends Curso$modulosArgs<ExtArgs> = {}>(args?: Subset<T, Curso$modulosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inscripciones<T extends Curso$inscripcionesArgs<ExtArgs> = {}>(args?: Subset<T, Curso$inscripcionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Curso model
   */
  interface CursoFieldRefs {
    readonly id: FieldRef<"Curso", 'Int'>
    readonly titulo: FieldRef<"Curso", 'String'>
    readonly descripcion: FieldRef<"Curso", 'String'>
    readonly nivel: FieldRef<"Curso", 'String'>
    readonly estado: FieldRef<"Curso", 'Boolean'>
    readonly instructorId: FieldRef<"Curso", 'Int'>
    readonly createdAt: FieldRef<"Curso", 'DateTime'>
    readonly updatedAt: FieldRef<"Curso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Curso findUnique
   */
  export type CursoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso findUniqueOrThrow
   */
  export type CursoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso findFirst
   */
  export type CursoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso findFirstOrThrow
   */
  export type CursoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso findMany
   */
  export type CursoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Cursos to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso create
   */
  export type CursoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The data needed to create a Curso.
     */
    data: XOR<CursoCreateInput, CursoUncheckedCreateInput>
  }

  /**
   * Curso createMany
   */
  export type CursoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cursos.
     */
    data: CursoCreateManyInput | CursoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Curso createManyAndReturn
   */
  export type CursoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * The data used to create many Cursos.
     */
    data: CursoCreateManyInput | CursoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Curso update
   */
  export type CursoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The data needed to update a Curso.
     */
    data: XOR<CursoUpdateInput, CursoUncheckedUpdateInput>
    /**
     * Choose, which Curso to update.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso updateMany
   */
  export type CursoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cursos.
     */
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyInput>
    /**
     * Filter which Cursos to update
     */
    where?: CursoWhereInput
    /**
     * Limit how many Cursos to update.
     */
    limit?: number
  }

  /**
   * Curso updateManyAndReturn
   */
  export type CursoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * The data used to update Cursos.
     */
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyInput>
    /**
     * Filter which Cursos to update
     */
    where?: CursoWhereInput
    /**
     * Limit how many Cursos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Curso upsert
   */
  export type CursoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The filter to search for the Curso to update in case it exists.
     */
    where: CursoWhereUniqueInput
    /**
     * In case the Curso found by the `where` argument doesn't exist, create a new Curso with this data.
     */
    create: XOR<CursoCreateInput, CursoUncheckedCreateInput>
    /**
     * In case the Curso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CursoUpdateInput, CursoUncheckedUpdateInput>
  }

  /**
   * Curso delete
   */
  export type CursoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter which Curso to delete.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso deleteMany
   */
  export type CursoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cursos to delete
     */
    where?: CursoWhereInput
    /**
     * Limit how many Cursos to delete.
     */
    limit?: number
  }

  /**
   * Curso.modulos
   */
  export type Curso$modulosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    where?: ModuloWhereInput
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    cursor?: ModuloWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }

  /**
   * Curso.inscripciones
   */
  export type Curso$inscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    cursor?: InscripcionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Curso without action
   */
  export type CursoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
  }


  /**
   * Model Modulo
   */

  export type AggregateModulo = {
    _count: ModuloCountAggregateOutputType | null
    _avg: ModuloAvgAggregateOutputType | null
    _sum: ModuloSumAggregateOutputType | null
    _min: ModuloMinAggregateOutputType | null
    _max: ModuloMaxAggregateOutputType | null
  }

  export type ModuloAvgAggregateOutputType = {
    id: number | null
    orden: number | null
    cursoId: number | null
  }

  export type ModuloSumAggregateOutputType = {
    id: number | null
    orden: number | null
    cursoId: number | null
  }

  export type ModuloMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    descripcion: string | null
    contenido: string | null
    orden: number | null
    estado: boolean | null
    cursoId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModuloMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    descripcion: string | null
    contenido: string | null
    orden: number | null
    estado: boolean | null
    cursoId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModuloCountAggregateOutputType = {
    id: number
    titulo: number
    descripcion: number
    contenido: number
    orden: number
    estado: number
    cursoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ModuloAvgAggregateInputType = {
    id?: true
    orden?: true
    cursoId?: true
  }

  export type ModuloSumAggregateInputType = {
    id?: true
    orden?: true
    cursoId?: true
  }

  export type ModuloMinAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    contenido?: true
    orden?: true
    estado?: true
    cursoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModuloMaxAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    contenido?: true
    orden?: true
    estado?: true
    cursoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModuloCountAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    contenido?: true
    orden?: true
    estado?: true
    cursoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ModuloAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modulo to aggregate.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Modulos
    **/
    _count?: true | ModuloCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModuloAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModuloSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuloMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuloMaxAggregateInputType
  }

  export type GetModuloAggregateType<T extends ModuloAggregateArgs> = {
        [P in keyof T & keyof AggregateModulo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModulo[P]>
      : GetScalarType<T[P], AggregateModulo[P]>
  }




  export type ModuloGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuloWhereInput
    orderBy?: ModuloOrderByWithAggregationInput | ModuloOrderByWithAggregationInput[]
    by: ModuloScalarFieldEnum[] | ModuloScalarFieldEnum
    having?: ModuloScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuloCountAggregateInputType | true
    _avg?: ModuloAvgAggregateInputType
    _sum?: ModuloSumAggregateInputType
    _min?: ModuloMinAggregateInputType
    _max?: ModuloMaxAggregateInputType
  }

  export type ModuloGroupByOutputType = {
    id: number
    titulo: string
    descripcion: string | null
    contenido: string | null
    orden: number
    estado: boolean
    cursoId: number
    createdAt: Date
    updatedAt: Date
    _count: ModuloCountAggregateOutputType | null
    _avg: ModuloAvgAggregateOutputType | null
    _sum: ModuloSumAggregateOutputType | null
    _min: ModuloMinAggregateOutputType | null
    _max: ModuloMaxAggregateOutputType | null
  }

  type GetModuloGroupByPayload<T extends ModuloGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuloGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuloGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuloGroupByOutputType[P]>
            : GetScalarType<T[P], ModuloGroupByOutputType[P]>
        }
      >
    >


  export type ModuloSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    cursoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    momentos?: boolean | Modulo$momentosArgs<ExtArgs>
    _count?: boolean | ModuloCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modulo"]>

  export type ModuloSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    cursoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modulo"]>

  export type ModuloSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    cursoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modulo"]>

  export type ModuloSelectScalar = {
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    cursoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ModuloOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "descripcion" | "contenido" | "orden" | "estado" | "cursoId" | "createdAt" | "updatedAt", ExtArgs["result"]["modulo"]>
  export type ModuloInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    momentos?: boolean | Modulo$momentosArgs<ExtArgs>
    _count?: boolean | ModuloCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ModuloIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }
  export type ModuloIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }

  export type $ModuloPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Modulo"
    objects: {
      curso: Prisma.$CursoPayload<ExtArgs>
      momentos: Prisma.$MomentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      descripcion: string | null
      contenido: string | null
      orden: number
      estado: boolean
      cursoId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["modulo"]>
    composites: {}
  }

  type ModuloGetPayload<S extends boolean | null | undefined | ModuloDefaultArgs> = $Result.GetResult<Prisma.$ModuloPayload, S>

  type ModuloCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModuloFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModuloCountAggregateInputType | true
    }

  export interface ModuloDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Modulo'], meta: { name: 'Modulo' } }
    /**
     * Find zero or one Modulo that matches the filter.
     * @param {ModuloFindUniqueArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModuloFindUniqueArgs>(args: SelectSubset<T, ModuloFindUniqueArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Modulo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModuloFindUniqueOrThrowArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModuloFindUniqueOrThrowArgs>(args: SelectSubset<T, ModuloFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Modulo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloFindFirstArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModuloFindFirstArgs>(args?: SelectSubset<T, ModuloFindFirstArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Modulo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloFindFirstOrThrowArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModuloFindFirstOrThrowArgs>(args?: SelectSubset<T, ModuloFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Modulos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modulos
     * const modulos = await prisma.modulo.findMany()
     * 
     * // Get first 10 Modulos
     * const modulos = await prisma.modulo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduloWithIdOnly = await prisma.modulo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModuloFindManyArgs>(args?: SelectSubset<T, ModuloFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Modulo.
     * @param {ModuloCreateArgs} args - Arguments to create a Modulo.
     * @example
     * // Create one Modulo
     * const Modulo = await prisma.modulo.create({
     *   data: {
     *     // ... data to create a Modulo
     *   }
     * })
     * 
     */
    create<T extends ModuloCreateArgs>(args: SelectSubset<T, ModuloCreateArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Modulos.
     * @param {ModuloCreateManyArgs} args - Arguments to create many Modulos.
     * @example
     * // Create many Modulos
     * const modulo = await prisma.modulo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModuloCreateManyArgs>(args?: SelectSubset<T, ModuloCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Modulos and returns the data saved in the database.
     * @param {ModuloCreateManyAndReturnArgs} args - Arguments to create many Modulos.
     * @example
     * // Create many Modulos
     * const modulo = await prisma.modulo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Modulos and only return the `id`
     * const moduloWithIdOnly = await prisma.modulo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModuloCreateManyAndReturnArgs>(args?: SelectSubset<T, ModuloCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Modulo.
     * @param {ModuloDeleteArgs} args - Arguments to delete one Modulo.
     * @example
     * // Delete one Modulo
     * const Modulo = await prisma.modulo.delete({
     *   where: {
     *     // ... filter to delete one Modulo
     *   }
     * })
     * 
     */
    delete<T extends ModuloDeleteArgs>(args: SelectSubset<T, ModuloDeleteArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Modulo.
     * @param {ModuloUpdateArgs} args - Arguments to update one Modulo.
     * @example
     * // Update one Modulo
     * const modulo = await prisma.modulo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModuloUpdateArgs>(args: SelectSubset<T, ModuloUpdateArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Modulos.
     * @param {ModuloDeleteManyArgs} args - Arguments to filter Modulos to delete.
     * @example
     * // Delete a few Modulos
     * const { count } = await prisma.modulo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModuloDeleteManyArgs>(args?: SelectSubset<T, ModuloDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modulos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modulos
     * const modulo = await prisma.modulo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModuloUpdateManyArgs>(args: SelectSubset<T, ModuloUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modulos and returns the data updated in the database.
     * @param {ModuloUpdateManyAndReturnArgs} args - Arguments to update many Modulos.
     * @example
     * // Update many Modulos
     * const modulo = await prisma.modulo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Modulos and only return the `id`
     * const moduloWithIdOnly = await prisma.modulo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModuloUpdateManyAndReturnArgs>(args: SelectSubset<T, ModuloUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Modulo.
     * @param {ModuloUpsertArgs} args - Arguments to update or create a Modulo.
     * @example
     * // Update or create a Modulo
     * const modulo = await prisma.modulo.upsert({
     *   create: {
     *     // ... data to create a Modulo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Modulo we want to update
     *   }
     * })
     */
    upsert<T extends ModuloUpsertArgs>(args: SelectSubset<T, ModuloUpsertArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Modulos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloCountArgs} args - Arguments to filter Modulos to count.
     * @example
     * // Count the number of Modulos
     * const count = await prisma.modulo.count({
     *   where: {
     *     // ... the filter for the Modulos we want to count
     *   }
     * })
    **/
    count<T extends ModuloCountArgs>(
      args?: Subset<T, ModuloCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuloCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Modulo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuloAggregateArgs>(args: Subset<T, ModuloAggregateArgs>): Prisma.PrismaPromise<GetModuloAggregateType<T>>

    /**
     * Group by Modulo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuloGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuloGroupByArgs['orderBy'] }
        : { orderBy?: ModuloGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuloGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuloGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Modulo model
   */
  readonly fields: ModuloFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Modulo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModuloClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curso<T extends CursoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CursoDefaultArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    momentos<T extends Modulo$momentosArgs<ExtArgs> = {}>(args?: Subset<T, Modulo$momentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Modulo model
   */
  interface ModuloFieldRefs {
    readonly id: FieldRef<"Modulo", 'Int'>
    readonly titulo: FieldRef<"Modulo", 'String'>
    readonly descripcion: FieldRef<"Modulo", 'String'>
    readonly contenido: FieldRef<"Modulo", 'String'>
    readonly orden: FieldRef<"Modulo", 'Int'>
    readonly estado: FieldRef<"Modulo", 'Boolean'>
    readonly cursoId: FieldRef<"Modulo", 'Int'>
    readonly createdAt: FieldRef<"Modulo", 'DateTime'>
    readonly updatedAt: FieldRef<"Modulo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Modulo findUnique
   */
  export type ModuloFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where: ModuloWhereUniqueInput
  }

  /**
   * Modulo findUniqueOrThrow
   */
  export type ModuloFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where: ModuloWhereUniqueInput
  }

  /**
   * Modulo findFirst
   */
  export type ModuloFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modulos.
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modulos.
     */
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }

  /**
   * Modulo findFirstOrThrow
   */
  export type ModuloFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modulos.
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modulos.
     */
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }

  /**
   * Modulo findMany
   */
  export type ModuloFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulos to fetch.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Modulos.
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modulos.
     */
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }

  /**
   * Modulo create
   */
  export type ModuloCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * The data needed to create a Modulo.
     */
    data: XOR<ModuloCreateInput, ModuloUncheckedCreateInput>
  }

  /**
   * Modulo createMany
   */
  export type ModuloCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Modulos.
     */
    data: ModuloCreateManyInput | ModuloCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Modulo createManyAndReturn
   */
  export type ModuloCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * The data used to create many Modulos.
     */
    data: ModuloCreateManyInput | ModuloCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Modulo update
   */
  export type ModuloUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * The data needed to update a Modulo.
     */
    data: XOR<ModuloUpdateInput, ModuloUncheckedUpdateInput>
    /**
     * Choose, which Modulo to update.
     */
    where: ModuloWhereUniqueInput
  }

  /**
   * Modulo updateMany
   */
  export type ModuloUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Modulos.
     */
    data: XOR<ModuloUpdateManyMutationInput, ModuloUncheckedUpdateManyInput>
    /**
     * Filter which Modulos to update
     */
    where?: ModuloWhereInput
    /**
     * Limit how many Modulos to update.
     */
    limit?: number
  }

  /**
   * Modulo updateManyAndReturn
   */
  export type ModuloUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * The data used to update Modulos.
     */
    data: XOR<ModuloUpdateManyMutationInput, ModuloUncheckedUpdateManyInput>
    /**
     * Filter which Modulos to update
     */
    where?: ModuloWhereInput
    /**
     * Limit how many Modulos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Modulo upsert
   */
  export type ModuloUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * The filter to search for the Modulo to update in case it exists.
     */
    where: ModuloWhereUniqueInput
    /**
     * In case the Modulo found by the `where` argument doesn't exist, create a new Modulo with this data.
     */
    create: XOR<ModuloCreateInput, ModuloUncheckedCreateInput>
    /**
     * In case the Modulo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuloUpdateInput, ModuloUncheckedUpdateInput>
  }

  /**
   * Modulo delete
   */
  export type ModuloDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter which Modulo to delete.
     */
    where: ModuloWhereUniqueInput
  }

  /**
   * Modulo deleteMany
   */
  export type ModuloDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modulos to delete
     */
    where?: ModuloWhereInput
    /**
     * Limit how many Modulos to delete.
     */
    limit?: number
  }

  /**
   * Modulo.momentos
   */
  export type Modulo$momentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    where?: MomentoWhereInput
    orderBy?: MomentoOrderByWithRelationInput | MomentoOrderByWithRelationInput[]
    cursor?: MomentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MomentoScalarFieldEnum | MomentoScalarFieldEnum[]
  }

  /**
   * Modulo without action
   */
  export type ModuloDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modulo
     */
    omit?: ModuloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuloInclude<ExtArgs> | null
  }


  /**
   * Model Momento
   */

  export type AggregateMomento = {
    _count: MomentoCountAggregateOutputType | null
    _avg: MomentoAvgAggregateOutputType | null
    _sum: MomentoSumAggregateOutputType | null
    _min: MomentoMinAggregateOutputType | null
    _max: MomentoMaxAggregateOutputType | null
  }

  export type MomentoAvgAggregateOutputType = {
    id: number | null
    orden: number | null
    moduloId: number | null
  }

  export type MomentoSumAggregateOutputType = {
    id: number | null
    orden: number | null
    moduloId: number | null
  }

  export type MomentoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    tipo: string | null
    orden: number | null
    moduloId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MomentoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    tipo: string | null
    orden: number | null
    moduloId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MomentoCountAggregateOutputType = {
    id: number
    nombre: number
    tipo: number
    orden: number
    moduloId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MomentoAvgAggregateInputType = {
    id?: true
    orden?: true
    moduloId?: true
  }

  export type MomentoSumAggregateInputType = {
    id?: true
    orden?: true
    moduloId?: true
  }

  export type MomentoMinAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    orden?: true
    moduloId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MomentoMaxAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    orden?: true
    moduloId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MomentoCountAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    orden?: true
    moduloId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MomentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Momento to aggregate.
     */
    where?: MomentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Momentos to fetch.
     */
    orderBy?: MomentoOrderByWithRelationInput | MomentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MomentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Momentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Momentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Momentos
    **/
    _count?: true | MomentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MomentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MomentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MomentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MomentoMaxAggregateInputType
  }

  export type GetMomentoAggregateType<T extends MomentoAggregateArgs> = {
        [P in keyof T & keyof AggregateMomento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMomento[P]>
      : GetScalarType<T[P], AggregateMomento[P]>
  }




  export type MomentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MomentoWhereInput
    orderBy?: MomentoOrderByWithAggregationInput | MomentoOrderByWithAggregationInput[]
    by: MomentoScalarFieldEnum[] | MomentoScalarFieldEnum
    having?: MomentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MomentoCountAggregateInputType | true
    _avg?: MomentoAvgAggregateInputType
    _sum?: MomentoSumAggregateInputType
    _min?: MomentoMinAggregateInputType
    _max?: MomentoMaxAggregateInputType
  }

  export type MomentoGroupByOutputType = {
    id: number
    nombre: string
    tipo: string
    orden: number
    moduloId: number
    createdAt: Date
    updatedAt: Date
    _count: MomentoCountAggregateOutputType | null
    _avg: MomentoAvgAggregateOutputType | null
    _sum: MomentoSumAggregateOutputType | null
    _min: MomentoMinAggregateOutputType | null
    _max: MomentoMaxAggregateOutputType | null
  }

  type GetMomentoGroupByPayload<T extends MomentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MomentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MomentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MomentoGroupByOutputType[P]>
            : GetScalarType<T[P], MomentoGroupByOutputType[P]>
        }
      >
    >


  export type MomentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    orden?: boolean
    moduloId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modulo?: boolean | ModuloDefaultArgs<ExtArgs>
    actividades?: boolean | Momento$actividadesArgs<ExtArgs>
    _count?: boolean | MomentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["momento"]>

  export type MomentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    orden?: boolean
    moduloId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modulo?: boolean | ModuloDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["momento"]>

  export type MomentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    orden?: boolean
    moduloId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modulo?: boolean | ModuloDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["momento"]>

  export type MomentoSelectScalar = {
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    orden?: boolean
    moduloId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MomentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "tipo" | "orden" | "moduloId" | "createdAt" | "updatedAt", ExtArgs["result"]["momento"]>
  export type MomentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modulo?: boolean | ModuloDefaultArgs<ExtArgs>
    actividades?: boolean | Momento$actividadesArgs<ExtArgs>
    _count?: boolean | MomentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MomentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modulo?: boolean | ModuloDefaultArgs<ExtArgs>
  }
  export type MomentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modulo?: boolean | ModuloDefaultArgs<ExtArgs>
  }

  export type $MomentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Momento"
    objects: {
      modulo: Prisma.$ModuloPayload<ExtArgs>
      actividades: Prisma.$ActividadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      tipo: string
      orden: number
      moduloId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["momento"]>
    composites: {}
  }

  type MomentoGetPayload<S extends boolean | null | undefined | MomentoDefaultArgs> = $Result.GetResult<Prisma.$MomentoPayload, S>

  type MomentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MomentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MomentoCountAggregateInputType | true
    }

  export interface MomentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Momento'], meta: { name: 'Momento' } }
    /**
     * Find zero or one Momento that matches the filter.
     * @param {MomentoFindUniqueArgs} args - Arguments to find a Momento
     * @example
     * // Get one Momento
     * const momento = await prisma.momento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MomentoFindUniqueArgs>(args: SelectSubset<T, MomentoFindUniqueArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Momento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MomentoFindUniqueOrThrowArgs} args - Arguments to find a Momento
     * @example
     * // Get one Momento
     * const momento = await prisma.momento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MomentoFindUniqueOrThrowArgs>(args: SelectSubset<T, MomentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Momento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoFindFirstArgs} args - Arguments to find a Momento
     * @example
     * // Get one Momento
     * const momento = await prisma.momento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MomentoFindFirstArgs>(args?: SelectSubset<T, MomentoFindFirstArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Momento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoFindFirstOrThrowArgs} args - Arguments to find a Momento
     * @example
     * // Get one Momento
     * const momento = await prisma.momento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MomentoFindFirstOrThrowArgs>(args?: SelectSubset<T, MomentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Momentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Momentos
     * const momentos = await prisma.momento.findMany()
     * 
     * // Get first 10 Momentos
     * const momentos = await prisma.momento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const momentoWithIdOnly = await prisma.momento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MomentoFindManyArgs>(args?: SelectSubset<T, MomentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Momento.
     * @param {MomentoCreateArgs} args - Arguments to create a Momento.
     * @example
     * // Create one Momento
     * const Momento = await prisma.momento.create({
     *   data: {
     *     // ... data to create a Momento
     *   }
     * })
     * 
     */
    create<T extends MomentoCreateArgs>(args: SelectSubset<T, MomentoCreateArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Momentos.
     * @param {MomentoCreateManyArgs} args - Arguments to create many Momentos.
     * @example
     * // Create many Momentos
     * const momento = await prisma.momento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MomentoCreateManyArgs>(args?: SelectSubset<T, MomentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Momentos and returns the data saved in the database.
     * @param {MomentoCreateManyAndReturnArgs} args - Arguments to create many Momentos.
     * @example
     * // Create many Momentos
     * const momento = await prisma.momento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Momentos and only return the `id`
     * const momentoWithIdOnly = await prisma.momento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MomentoCreateManyAndReturnArgs>(args?: SelectSubset<T, MomentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Momento.
     * @param {MomentoDeleteArgs} args - Arguments to delete one Momento.
     * @example
     * // Delete one Momento
     * const Momento = await prisma.momento.delete({
     *   where: {
     *     // ... filter to delete one Momento
     *   }
     * })
     * 
     */
    delete<T extends MomentoDeleteArgs>(args: SelectSubset<T, MomentoDeleteArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Momento.
     * @param {MomentoUpdateArgs} args - Arguments to update one Momento.
     * @example
     * // Update one Momento
     * const momento = await prisma.momento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MomentoUpdateArgs>(args: SelectSubset<T, MomentoUpdateArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Momentos.
     * @param {MomentoDeleteManyArgs} args - Arguments to filter Momentos to delete.
     * @example
     * // Delete a few Momentos
     * const { count } = await prisma.momento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MomentoDeleteManyArgs>(args?: SelectSubset<T, MomentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Momentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Momentos
     * const momento = await prisma.momento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MomentoUpdateManyArgs>(args: SelectSubset<T, MomentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Momentos and returns the data updated in the database.
     * @param {MomentoUpdateManyAndReturnArgs} args - Arguments to update many Momentos.
     * @example
     * // Update many Momentos
     * const momento = await prisma.momento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Momentos and only return the `id`
     * const momentoWithIdOnly = await prisma.momento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MomentoUpdateManyAndReturnArgs>(args: SelectSubset<T, MomentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Momento.
     * @param {MomentoUpsertArgs} args - Arguments to update or create a Momento.
     * @example
     * // Update or create a Momento
     * const momento = await prisma.momento.upsert({
     *   create: {
     *     // ... data to create a Momento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Momento we want to update
     *   }
     * })
     */
    upsert<T extends MomentoUpsertArgs>(args: SelectSubset<T, MomentoUpsertArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Momentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoCountArgs} args - Arguments to filter Momentos to count.
     * @example
     * // Count the number of Momentos
     * const count = await prisma.momento.count({
     *   where: {
     *     // ... the filter for the Momentos we want to count
     *   }
     * })
    **/
    count<T extends MomentoCountArgs>(
      args?: Subset<T, MomentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MomentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Momento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MomentoAggregateArgs>(args: Subset<T, MomentoAggregateArgs>): Prisma.PrismaPromise<GetMomentoAggregateType<T>>

    /**
     * Group by Momento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MomentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MomentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MomentoGroupByArgs['orderBy'] }
        : { orderBy?: MomentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MomentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMomentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Momento model
   */
  readonly fields: MomentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Momento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MomentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    modulo<T extends ModuloDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModuloDefaultArgs<ExtArgs>>): Prisma__ModuloClient<$Result.GetResult<Prisma.$ModuloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actividades<T extends Momento$actividadesArgs<ExtArgs> = {}>(args?: Subset<T, Momento$actividadesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Momento model
   */
  interface MomentoFieldRefs {
    readonly id: FieldRef<"Momento", 'Int'>
    readonly nombre: FieldRef<"Momento", 'String'>
    readonly tipo: FieldRef<"Momento", 'String'>
    readonly orden: FieldRef<"Momento", 'Int'>
    readonly moduloId: FieldRef<"Momento", 'Int'>
    readonly createdAt: FieldRef<"Momento", 'DateTime'>
    readonly updatedAt: FieldRef<"Momento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Momento findUnique
   */
  export type MomentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * Filter, which Momento to fetch.
     */
    where: MomentoWhereUniqueInput
  }

  /**
   * Momento findUniqueOrThrow
   */
  export type MomentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * Filter, which Momento to fetch.
     */
    where: MomentoWhereUniqueInput
  }

  /**
   * Momento findFirst
   */
  export type MomentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * Filter, which Momento to fetch.
     */
    where?: MomentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Momentos to fetch.
     */
    orderBy?: MomentoOrderByWithRelationInput | MomentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Momentos.
     */
    cursor?: MomentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Momentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Momentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Momentos.
     */
    distinct?: MomentoScalarFieldEnum | MomentoScalarFieldEnum[]
  }

  /**
   * Momento findFirstOrThrow
   */
  export type MomentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * Filter, which Momento to fetch.
     */
    where?: MomentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Momentos to fetch.
     */
    orderBy?: MomentoOrderByWithRelationInput | MomentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Momentos.
     */
    cursor?: MomentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Momentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Momentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Momentos.
     */
    distinct?: MomentoScalarFieldEnum | MomentoScalarFieldEnum[]
  }

  /**
   * Momento findMany
   */
  export type MomentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * Filter, which Momentos to fetch.
     */
    where?: MomentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Momentos to fetch.
     */
    orderBy?: MomentoOrderByWithRelationInput | MomentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Momentos.
     */
    cursor?: MomentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Momentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Momentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Momentos.
     */
    distinct?: MomentoScalarFieldEnum | MomentoScalarFieldEnum[]
  }

  /**
   * Momento create
   */
  export type MomentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Momento.
     */
    data: XOR<MomentoCreateInput, MomentoUncheckedCreateInput>
  }

  /**
   * Momento createMany
   */
  export type MomentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Momentos.
     */
    data: MomentoCreateManyInput | MomentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Momento createManyAndReturn
   */
  export type MomentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * The data used to create many Momentos.
     */
    data: MomentoCreateManyInput | MomentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Momento update
   */
  export type MomentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Momento.
     */
    data: XOR<MomentoUpdateInput, MomentoUncheckedUpdateInput>
    /**
     * Choose, which Momento to update.
     */
    where: MomentoWhereUniqueInput
  }

  /**
   * Momento updateMany
   */
  export type MomentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Momentos.
     */
    data: XOR<MomentoUpdateManyMutationInput, MomentoUncheckedUpdateManyInput>
    /**
     * Filter which Momentos to update
     */
    where?: MomentoWhereInput
    /**
     * Limit how many Momentos to update.
     */
    limit?: number
  }

  /**
   * Momento updateManyAndReturn
   */
  export type MomentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * The data used to update Momentos.
     */
    data: XOR<MomentoUpdateManyMutationInput, MomentoUncheckedUpdateManyInput>
    /**
     * Filter which Momentos to update
     */
    where?: MomentoWhereInput
    /**
     * Limit how many Momentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Momento upsert
   */
  export type MomentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Momento to update in case it exists.
     */
    where: MomentoWhereUniqueInput
    /**
     * In case the Momento found by the `where` argument doesn't exist, create a new Momento with this data.
     */
    create: XOR<MomentoCreateInput, MomentoUncheckedCreateInput>
    /**
     * In case the Momento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MomentoUpdateInput, MomentoUncheckedUpdateInput>
  }

  /**
   * Momento delete
   */
  export type MomentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
    /**
     * Filter which Momento to delete.
     */
    where: MomentoWhereUniqueInput
  }

  /**
   * Momento deleteMany
   */
  export type MomentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Momentos to delete
     */
    where?: MomentoWhereInput
    /**
     * Limit how many Momentos to delete.
     */
    limit?: number
  }

  /**
   * Momento.actividades
   */
  export type Momento$actividadesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    where?: ActividadWhereInput
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    cursor?: ActividadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Momento without action
   */
  export type MomentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Momento
     */
    select?: MomentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Momento
     */
    omit?: MomentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MomentoInclude<ExtArgs> | null
  }


  /**
   * Model Actividad
   */

  export type AggregateActividad = {
    _count: ActividadCountAggregateOutputType | null
    _avg: ActividadAvgAggregateOutputType | null
    _sum: ActividadSumAggregateOutputType | null
    _min: ActividadMinAggregateOutputType | null
    _max: ActividadMaxAggregateOutputType | null
  }

  export type ActividadAvgAggregateOutputType = {
    id: number | null
    orden: number | null
    momentoId: number | null
  }

  export type ActividadSumAggregateOutputType = {
    id: number | null
    orden: number | null
    momentoId: number | null
  }

  export type ActividadMinAggregateOutputType = {
    id: number | null
    tipo: string | null
    titulo: string | null
    instrucciones: string | null
    orden: number | null
    estado: boolean | null
    momentoId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActividadMaxAggregateOutputType = {
    id: number | null
    tipo: string | null
    titulo: string | null
    instrucciones: string | null
    orden: number | null
    estado: boolean | null
    momentoId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActividadCountAggregateOutputType = {
    id: number
    tipo: number
    titulo: number
    instrucciones: number
    contenido: number
    orden: number
    estado: number
    momentoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActividadAvgAggregateInputType = {
    id?: true
    orden?: true
    momentoId?: true
  }

  export type ActividadSumAggregateInputType = {
    id?: true
    orden?: true
    momentoId?: true
  }

  export type ActividadMinAggregateInputType = {
    id?: true
    tipo?: true
    titulo?: true
    instrucciones?: true
    orden?: true
    estado?: true
    momentoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActividadMaxAggregateInputType = {
    id?: true
    tipo?: true
    titulo?: true
    instrucciones?: true
    orden?: true
    estado?: true
    momentoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActividadCountAggregateInputType = {
    id?: true
    tipo?: true
    titulo?: true
    instrucciones?: true
    contenido?: true
    orden?: true
    estado?: true
    momentoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActividadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Actividad to aggregate.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Actividads
    **/
    _count?: true | ActividadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActividadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActividadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActividadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActividadMaxAggregateInputType
  }

  export type GetActividadAggregateType<T extends ActividadAggregateArgs> = {
        [P in keyof T & keyof AggregateActividad]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActividad[P]>
      : GetScalarType<T[P], AggregateActividad[P]>
  }




  export type ActividadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActividadWhereInput
    orderBy?: ActividadOrderByWithAggregationInput | ActividadOrderByWithAggregationInput[]
    by: ActividadScalarFieldEnum[] | ActividadScalarFieldEnum
    having?: ActividadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActividadCountAggregateInputType | true
    _avg?: ActividadAvgAggregateInputType
    _sum?: ActividadSumAggregateInputType
    _min?: ActividadMinAggregateInputType
    _max?: ActividadMaxAggregateInputType
  }

  export type ActividadGroupByOutputType = {
    id: number
    tipo: string
    titulo: string
    instrucciones: string | null
    contenido: JsonValue
    orden: number
    estado: boolean
    momentoId: number
    createdAt: Date
    updatedAt: Date
    _count: ActividadCountAggregateOutputType | null
    _avg: ActividadAvgAggregateOutputType | null
    _sum: ActividadSumAggregateOutputType | null
    _min: ActividadMinAggregateOutputType | null
    _max: ActividadMaxAggregateOutputType | null
  }

  type GetActividadGroupByPayload<T extends ActividadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActividadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActividadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActividadGroupByOutputType[P]>
            : GetScalarType<T[P], ActividadGroupByOutputType[P]>
        }
      >
    >


  export type ActividadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    titulo?: boolean
    instrucciones?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    momentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    momento?: boolean | MomentoDefaultArgs<ExtArgs>
    progresos?: boolean | Actividad$progresosArgs<ExtArgs>
    _count?: boolean | ActividadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actividad"]>

  export type ActividadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    titulo?: boolean
    instrucciones?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    momentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    momento?: boolean | MomentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actividad"]>

  export type ActividadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    titulo?: boolean
    instrucciones?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    momentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    momento?: boolean | MomentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actividad"]>

  export type ActividadSelectScalar = {
    id?: boolean
    tipo?: boolean
    titulo?: boolean
    instrucciones?: boolean
    contenido?: boolean
    orden?: boolean
    estado?: boolean
    momentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActividadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "titulo" | "instrucciones" | "contenido" | "orden" | "estado" | "momentoId" | "createdAt" | "updatedAt", ExtArgs["result"]["actividad"]>
  export type ActividadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    momento?: boolean | MomentoDefaultArgs<ExtArgs>
    progresos?: boolean | Actividad$progresosArgs<ExtArgs>
    _count?: boolean | ActividadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActividadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    momento?: boolean | MomentoDefaultArgs<ExtArgs>
  }
  export type ActividadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    momento?: boolean | MomentoDefaultArgs<ExtArgs>
  }

  export type $ActividadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Actividad"
    objects: {
      momento: Prisma.$MomentoPayload<ExtArgs>
      progresos: Prisma.$ProgresoActividadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tipo: string
      titulo: string
      instrucciones: string | null
      contenido: Prisma.JsonValue
      orden: number
      estado: boolean
      momentoId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["actividad"]>
    composites: {}
  }

  type ActividadGetPayload<S extends boolean | null | undefined | ActividadDefaultArgs> = $Result.GetResult<Prisma.$ActividadPayload, S>

  type ActividadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActividadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActividadCountAggregateInputType | true
    }

  export interface ActividadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Actividad'], meta: { name: 'Actividad' } }
    /**
     * Find zero or one Actividad that matches the filter.
     * @param {ActividadFindUniqueArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActividadFindUniqueArgs>(args: SelectSubset<T, ActividadFindUniqueArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Actividad that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActividadFindUniqueOrThrowArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActividadFindUniqueOrThrowArgs>(args: SelectSubset<T, ActividadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Actividad that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadFindFirstArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActividadFindFirstArgs>(args?: SelectSubset<T, ActividadFindFirstArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Actividad that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadFindFirstOrThrowArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActividadFindFirstOrThrowArgs>(args?: SelectSubset<T, ActividadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Actividads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Actividads
     * const actividads = await prisma.actividad.findMany()
     * 
     * // Get first 10 Actividads
     * const actividads = await prisma.actividad.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actividadWithIdOnly = await prisma.actividad.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActividadFindManyArgs>(args?: SelectSubset<T, ActividadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Actividad.
     * @param {ActividadCreateArgs} args - Arguments to create a Actividad.
     * @example
     * // Create one Actividad
     * const Actividad = await prisma.actividad.create({
     *   data: {
     *     // ... data to create a Actividad
     *   }
     * })
     * 
     */
    create<T extends ActividadCreateArgs>(args: SelectSubset<T, ActividadCreateArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Actividads.
     * @param {ActividadCreateManyArgs} args - Arguments to create many Actividads.
     * @example
     * // Create many Actividads
     * const actividad = await prisma.actividad.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActividadCreateManyArgs>(args?: SelectSubset<T, ActividadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Actividads and returns the data saved in the database.
     * @param {ActividadCreateManyAndReturnArgs} args - Arguments to create many Actividads.
     * @example
     * // Create many Actividads
     * const actividad = await prisma.actividad.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Actividads and only return the `id`
     * const actividadWithIdOnly = await prisma.actividad.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActividadCreateManyAndReturnArgs>(args?: SelectSubset<T, ActividadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Actividad.
     * @param {ActividadDeleteArgs} args - Arguments to delete one Actividad.
     * @example
     * // Delete one Actividad
     * const Actividad = await prisma.actividad.delete({
     *   where: {
     *     // ... filter to delete one Actividad
     *   }
     * })
     * 
     */
    delete<T extends ActividadDeleteArgs>(args: SelectSubset<T, ActividadDeleteArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Actividad.
     * @param {ActividadUpdateArgs} args - Arguments to update one Actividad.
     * @example
     * // Update one Actividad
     * const actividad = await prisma.actividad.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActividadUpdateArgs>(args: SelectSubset<T, ActividadUpdateArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Actividads.
     * @param {ActividadDeleteManyArgs} args - Arguments to filter Actividads to delete.
     * @example
     * // Delete a few Actividads
     * const { count } = await prisma.actividad.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActividadDeleteManyArgs>(args?: SelectSubset<T, ActividadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Actividads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Actividads
     * const actividad = await prisma.actividad.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActividadUpdateManyArgs>(args: SelectSubset<T, ActividadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Actividads and returns the data updated in the database.
     * @param {ActividadUpdateManyAndReturnArgs} args - Arguments to update many Actividads.
     * @example
     * // Update many Actividads
     * const actividad = await prisma.actividad.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Actividads and only return the `id`
     * const actividadWithIdOnly = await prisma.actividad.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActividadUpdateManyAndReturnArgs>(args: SelectSubset<T, ActividadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Actividad.
     * @param {ActividadUpsertArgs} args - Arguments to update or create a Actividad.
     * @example
     * // Update or create a Actividad
     * const actividad = await prisma.actividad.upsert({
     *   create: {
     *     // ... data to create a Actividad
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Actividad we want to update
     *   }
     * })
     */
    upsert<T extends ActividadUpsertArgs>(args: SelectSubset<T, ActividadUpsertArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Actividads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadCountArgs} args - Arguments to filter Actividads to count.
     * @example
     * // Count the number of Actividads
     * const count = await prisma.actividad.count({
     *   where: {
     *     // ... the filter for the Actividads we want to count
     *   }
     * })
    **/
    count<T extends ActividadCountArgs>(
      args?: Subset<T, ActividadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActividadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Actividad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActividadAggregateArgs>(args: Subset<T, ActividadAggregateArgs>): Prisma.PrismaPromise<GetActividadAggregateType<T>>

    /**
     * Group by Actividad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActividadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActividadGroupByArgs['orderBy'] }
        : { orderBy?: ActividadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActividadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActividadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Actividad model
   */
  readonly fields: ActividadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Actividad.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActividadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    momento<T extends MomentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MomentoDefaultArgs<ExtArgs>>): Prisma__MomentoClient<$Result.GetResult<Prisma.$MomentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    progresos<T extends Actividad$progresosArgs<ExtArgs> = {}>(args?: Subset<T, Actividad$progresosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Actividad model
   */
  interface ActividadFieldRefs {
    readonly id: FieldRef<"Actividad", 'Int'>
    readonly tipo: FieldRef<"Actividad", 'String'>
    readonly titulo: FieldRef<"Actividad", 'String'>
    readonly instrucciones: FieldRef<"Actividad", 'String'>
    readonly contenido: FieldRef<"Actividad", 'Json'>
    readonly orden: FieldRef<"Actividad", 'Int'>
    readonly estado: FieldRef<"Actividad", 'Boolean'>
    readonly momentoId: FieldRef<"Actividad", 'Int'>
    readonly createdAt: FieldRef<"Actividad", 'DateTime'>
    readonly updatedAt: FieldRef<"Actividad", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Actividad findUnique
   */
  export type ActividadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad findUniqueOrThrow
   */
  export type ActividadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad findFirst
   */
  export type ActividadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Actividads.
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Actividads.
     */
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Actividad findFirstOrThrow
   */
  export type ActividadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Actividads.
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Actividads.
     */
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Actividad findMany
   */
  export type ActividadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividads to fetch.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Actividads.
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Actividads.
     */
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Actividad create
   */
  export type ActividadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * The data needed to create a Actividad.
     */
    data: XOR<ActividadCreateInput, ActividadUncheckedCreateInput>
  }

  /**
   * Actividad createMany
   */
  export type ActividadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Actividads.
     */
    data: ActividadCreateManyInput | ActividadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Actividad createManyAndReturn
   */
  export type ActividadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * The data used to create many Actividads.
     */
    data: ActividadCreateManyInput | ActividadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Actividad update
   */
  export type ActividadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * The data needed to update a Actividad.
     */
    data: XOR<ActividadUpdateInput, ActividadUncheckedUpdateInput>
    /**
     * Choose, which Actividad to update.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad updateMany
   */
  export type ActividadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Actividads.
     */
    data: XOR<ActividadUpdateManyMutationInput, ActividadUncheckedUpdateManyInput>
    /**
     * Filter which Actividads to update
     */
    where?: ActividadWhereInput
    /**
     * Limit how many Actividads to update.
     */
    limit?: number
  }

  /**
   * Actividad updateManyAndReturn
   */
  export type ActividadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * The data used to update Actividads.
     */
    data: XOR<ActividadUpdateManyMutationInput, ActividadUncheckedUpdateManyInput>
    /**
     * Filter which Actividads to update
     */
    where?: ActividadWhereInput
    /**
     * Limit how many Actividads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Actividad upsert
   */
  export type ActividadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * The filter to search for the Actividad to update in case it exists.
     */
    where: ActividadWhereUniqueInput
    /**
     * In case the Actividad found by the `where` argument doesn't exist, create a new Actividad with this data.
     */
    create: XOR<ActividadCreateInput, ActividadUncheckedCreateInput>
    /**
     * In case the Actividad was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActividadUpdateInput, ActividadUncheckedUpdateInput>
  }

  /**
   * Actividad delete
   */
  export type ActividadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter which Actividad to delete.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad deleteMany
   */
  export type ActividadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Actividads to delete
     */
    where?: ActividadWhereInput
    /**
     * Limit how many Actividads to delete.
     */
    limit?: number
  }

  /**
   * Actividad.progresos
   */
  export type Actividad$progresosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    where?: ProgresoActividadWhereInput
    orderBy?: ProgresoActividadOrderByWithRelationInput | ProgresoActividadOrderByWithRelationInput[]
    cursor?: ProgresoActividadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgresoActividadScalarFieldEnum | ProgresoActividadScalarFieldEnum[]
  }

  /**
   * Actividad without action
   */
  export type ActividadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
  }


  /**
   * Model ProgresoActividad
   */

  export type AggregateProgresoActividad = {
    _count: ProgresoActividadCountAggregateOutputType | null
    _avg: ProgresoActividadAvgAggregateOutputType | null
    _sum: ProgresoActividadSumAggregateOutputType | null
    _min: ProgresoActividadMinAggregateOutputType | null
    _max: ProgresoActividadMaxAggregateOutputType | null
  }

  export type ProgresoActividadAvgAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    actividadId: number | null
    intentos: number | null
    puntaje: number | null
  }

  export type ProgresoActividadSumAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    actividadId: number | null
    intentos: number | null
    puntaje: number | null
  }

  export type ProgresoActividadMinAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    actividadId: number | null
    completada: boolean | null
    intentos: number | null
    puntaje: number | null
    completadoAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgresoActividadMaxAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    actividadId: number | null
    completada: boolean | null
    intentos: number | null
    puntaje: number | null
    completadoAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgresoActividadCountAggregateOutputType = {
    id: number
    aprendizId: number
    actividadId: number
    completada: number
    intentos: number
    puntaje: number
    respuesta: number
    completadoAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgresoActividadAvgAggregateInputType = {
    id?: true
    aprendizId?: true
    actividadId?: true
    intentos?: true
    puntaje?: true
  }

  export type ProgresoActividadSumAggregateInputType = {
    id?: true
    aprendizId?: true
    actividadId?: true
    intentos?: true
    puntaje?: true
  }

  export type ProgresoActividadMinAggregateInputType = {
    id?: true
    aprendizId?: true
    actividadId?: true
    completada?: true
    intentos?: true
    puntaje?: true
    completadoAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgresoActividadMaxAggregateInputType = {
    id?: true
    aprendizId?: true
    actividadId?: true
    completada?: true
    intentos?: true
    puntaje?: true
    completadoAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgresoActividadCountAggregateInputType = {
    id?: true
    aprendizId?: true
    actividadId?: true
    completada?: true
    intentos?: true
    puntaje?: true
    respuesta?: true
    completadoAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgresoActividadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgresoActividad to aggregate.
     */
    where?: ProgresoActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoActividads to fetch.
     */
    orderBy?: ProgresoActividadOrderByWithRelationInput | ProgresoActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgresoActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoActividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoActividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgresoActividads
    **/
    _count?: true | ProgresoActividadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgresoActividadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgresoActividadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgresoActividadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgresoActividadMaxAggregateInputType
  }

  export type GetProgresoActividadAggregateType<T extends ProgresoActividadAggregateArgs> = {
        [P in keyof T & keyof AggregateProgresoActividad]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgresoActividad[P]>
      : GetScalarType<T[P], AggregateProgresoActividad[P]>
  }




  export type ProgresoActividadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoActividadWhereInput
    orderBy?: ProgresoActividadOrderByWithAggregationInput | ProgresoActividadOrderByWithAggregationInput[]
    by: ProgresoActividadScalarFieldEnum[] | ProgresoActividadScalarFieldEnum
    having?: ProgresoActividadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgresoActividadCountAggregateInputType | true
    _avg?: ProgresoActividadAvgAggregateInputType
    _sum?: ProgresoActividadSumAggregateInputType
    _min?: ProgresoActividadMinAggregateInputType
    _max?: ProgresoActividadMaxAggregateInputType
  }

  export type ProgresoActividadGroupByOutputType = {
    id: number
    aprendizId: number
    actividadId: number
    completada: boolean
    intentos: number
    puntaje: number | null
    respuesta: JsonValue | null
    completadoAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProgresoActividadCountAggregateOutputType | null
    _avg: ProgresoActividadAvgAggregateOutputType | null
    _sum: ProgresoActividadSumAggregateOutputType | null
    _min: ProgresoActividadMinAggregateOutputType | null
    _max: ProgresoActividadMaxAggregateOutputType | null
  }

  type GetProgresoActividadGroupByPayload<T extends ProgresoActividadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgresoActividadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgresoActividadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgresoActividadGroupByOutputType[P]>
            : GetScalarType<T[P], ProgresoActividadGroupByOutputType[P]>
        }
      >
    >


  export type ProgresoActividadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    actividadId?: boolean
    completada?: boolean
    intentos?: boolean
    puntaje?: boolean
    respuesta?: boolean
    completadoAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    actividad?: boolean | ActividadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progresoActividad"]>

  export type ProgresoActividadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    actividadId?: boolean
    completada?: boolean
    intentos?: boolean
    puntaje?: boolean
    respuesta?: boolean
    completadoAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    actividad?: boolean | ActividadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progresoActividad"]>

  export type ProgresoActividadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    actividadId?: boolean
    completada?: boolean
    intentos?: boolean
    puntaje?: boolean
    respuesta?: boolean
    completadoAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    actividad?: boolean | ActividadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progresoActividad"]>

  export type ProgresoActividadSelectScalar = {
    id?: boolean
    aprendizId?: boolean
    actividadId?: boolean
    completada?: boolean
    intentos?: boolean
    puntaje?: boolean
    respuesta?: boolean
    completadoAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgresoActividadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aprendizId" | "actividadId" | "completada" | "intentos" | "puntaje" | "respuesta" | "completadoAt" | "createdAt" | "updatedAt", ExtArgs["result"]["progresoActividad"]>
  export type ProgresoActividadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    actividad?: boolean | ActividadDefaultArgs<ExtArgs>
  }
  export type ProgresoActividadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    actividad?: boolean | ActividadDefaultArgs<ExtArgs>
  }
  export type ProgresoActividadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    actividad?: boolean | ActividadDefaultArgs<ExtArgs>
  }

  export type $ProgresoActividadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgresoActividad"
    objects: {
      aprendiz: Prisma.$UserPayload<ExtArgs>
      actividad: Prisma.$ActividadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      aprendizId: number
      actividadId: number
      completada: boolean
      intentos: number
      puntaje: number | null
      respuesta: Prisma.JsonValue | null
      completadoAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["progresoActividad"]>
    composites: {}
  }

  type ProgresoActividadGetPayload<S extends boolean | null | undefined | ProgresoActividadDefaultArgs> = $Result.GetResult<Prisma.$ProgresoActividadPayload, S>

  type ProgresoActividadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgresoActividadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgresoActividadCountAggregateInputType | true
    }

  export interface ProgresoActividadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgresoActividad'], meta: { name: 'ProgresoActividad' } }
    /**
     * Find zero or one ProgresoActividad that matches the filter.
     * @param {ProgresoActividadFindUniqueArgs} args - Arguments to find a ProgresoActividad
     * @example
     * // Get one ProgresoActividad
     * const progresoActividad = await prisma.progresoActividad.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgresoActividadFindUniqueArgs>(args: SelectSubset<T, ProgresoActividadFindUniqueArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgresoActividad that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgresoActividadFindUniqueOrThrowArgs} args - Arguments to find a ProgresoActividad
     * @example
     * // Get one ProgresoActividad
     * const progresoActividad = await prisma.progresoActividad.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgresoActividadFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgresoActividadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgresoActividad that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadFindFirstArgs} args - Arguments to find a ProgresoActividad
     * @example
     * // Get one ProgresoActividad
     * const progresoActividad = await prisma.progresoActividad.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgresoActividadFindFirstArgs>(args?: SelectSubset<T, ProgresoActividadFindFirstArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgresoActividad that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadFindFirstOrThrowArgs} args - Arguments to find a ProgresoActividad
     * @example
     * // Get one ProgresoActividad
     * const progresoActividad = await prisma.progresoActividad.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgresoActividadFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgresoActividadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgresoActividads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgresoActividads
     * const progresoActividads = await prisma.progresoActividad.findMany()
     * 
     * // Get first 10 ProgresoActividads
     * const progresoActividads = await prisma.progresoActividad.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progresoActividadWithIdOnly = await prisma.progresoActividad.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgresoActividadFindManyArgs>(args?: SelectSubset<T, ProgresoActividadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgresoActividad.
     * @param {ProgresoActividadCreateArgs} args - Arguments to create a ProgresoActividad.
     * @example
     * // Create one ProgresoActividad
     * const ProgresoActividad = await prisma.progresoActividad.create({
     *   data: {
     *     // ... data to create a ProgresoActividad
     *   }
     * })
     * 
     */
    create<T extends ProgresoActividadCreateArgs>(args: SelectSubset<T, ProgresoActividadCreateArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgresoActividads.
     * @param {ProgresoActividadCreateManyArgs} args - Arguments to create many ProgresoActividads.
     * @example
     * // Create many ProgresoActividads
     * const progresoActividad = await prisma.progresoActividad.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgresoActividadCreateManyArgs>(args?: SelectSubset<T, ProgresoActividadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgresoActividads and returns the data saved in the database.
     * @param {ProgresoActividadCreateManyAndReturnArgs} args - Arguments to create many ProgresoActividads.
     * @example
     * // Create many ProgresoActividads
     * const progresoActividad = await prisma.progresoActividad.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgresoActividads and only return the `id`
     * const progresoActividadWithIdOnly = await prisma.progresoActividad.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgresoActividadCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgresoActividadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgresoActividad.
     * @param {ProgresoActividadDeleteArgs} args - Arguments to delete one ProgresoActividad.
     * @example
     * // Delete one ProgresoActividad
     * const ProgresoActividad = await prisma.progresoActividad.delete({
     *   where: {
     *     // ... filter to delete one ProgresoActividad
     *   }
     * })
     * 
     */
    delete<T extends ProgresoActividadDeleteArgs>(args: SelectSubset<T, ProgresoActividadDeleteArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgresoActividad.
     * @param {ProgresoActividadUpdateArgs} args - Arguments to update one ProgresoActividad.
     * @example
     * // Update one ProgresoActividad
     * const progresoActividad = await prisma.progresoActividad.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgresoActividadUpdateArgs>(args: SelectSubset<T, ProgresoActividadUpdateArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgresoActividads.
     * @param {ProgresoActividadDeleteManyArgs} args - Arguments to filter ProgresoActividads to delete.
     * @example
     * // Delete a few ProgresoActividads
     * const { count } = await prisma.progresoActividad.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgresoActividadDeleteManyArgs>(args?: SelectSubset<T, ProgresoActividadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgresoActividads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgresoActividads
     * const progresoActividad = await prisma.progresoActividad.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgresoActividadUpdateManyArgs>(args: SelectSubset<T, ProgresoActividadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgresoActividads and returns the data updated in the database.
     * @param {ProgresoActividadUpdateManyAndReturnArgs} args - Arguments to update many ProgresoActividads.
     * @example
     * // Update many ProgresoActividads
     * const progresoActividad = await prisma.progresoActividad.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgresoActividads and only return the `id`
     * const progresoActividadWithIdOnly = await prisma.progresoActividad.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgresoActividadUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgresoActividadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgresoActividad.
     * @param {ProgresoActividadUpsertArgs} args - Arguments to update or create a ProgresoActividad.
     * @example
     * // Update or create a ProgresoActividad
     * const progresoActividad = await prisma.progresoActividad.upsert({
     *   create: {
     *     // ... data to create a ProgresoActividad
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgresoActividad we want to update
     *   }
     * })
     */
    upsert<T extends ProgresoActividadUpsertArgs>(args: SelectSubset<T, ProgresoActividadUpsertArgs<ExtArgs>>): Prisma__ProgresoActividadClient<$Result.GetResult<Prisma.$ProgresoActividadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgresoActividads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadCountArgs} args - Arguments to filter ProgresoActividads to count.
     * @example
     * // Count the number of ProgresoActividads
     * const count = await prisma.progresoActividad.count({
     *   where: {
     *     // ... the filter for the ProgresoActividads we want to count
     *   }
     * })
    **/
    count<T extends ProgresoActividadCountArgs>(
      args?: Subset<T, ProgresoActividadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgresoActividadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgresoActividad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgresoActividadAggregateArgs>(args: Subset<T, ProgresoActividadAggregateArgs>): Prisma.PrismaPromise<GetProgresoActividadAggregateType<T>>

    /**
     * Group by ProgresoActividad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoActividadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgresoActividadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgresoActividadGroupByArgs['orderBy'] }
        : { orderBy?: ProgresoActividadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgresoActividadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgresoActividadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgresoActividad model
   */
  readonly fields: ProgresoActividadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgresoActividad.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgresoActividadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aprendiz<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actividad<T extends ActividadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ActividadDefaultArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgresoActividad model
   */
  interface ProgresoActividadFieldRefs {
    readonly id: FieldRef<"ProgresoActividad", 'Int'>
    readonly aprendizId: FieldRef<"ProgresoActividad", 'Int'>
    readonly actividadId: FieldRef<"ProgresoActividad", 'Int'>
    readonly completada: FieldRef<"ProgresoActividad", 'Boolean'>
    readonly intentos: FieldRef<"ProgresoActividad", 'Int'>
    readonly puntaje: FieldRef<"ProgresoActividad", 'Float'>
    readonly respuesta: FieldRef<"ProgresoActividad", 'Json'>
    readonly completadoAt: FieldRef<"ProgresoActividad", 'DateTime'>
    readonly createdAt: FieldRef<"ProgresoActividad", 'DateTime'>
    readonly updatedAt: FieldRef<"ProgresoActividad", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProgresoActividad findUnique
   */
  export type ProgresoActividadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoActividad to fetch.
     */
    where: ProgresoActividadWhereUniqueInput
  }

  /**
   * ProgresoActividad findUniqueOrThrow
   */
  export type ProgresoActividadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoActividad to fetch.
     */
    where: ProgresoActividadWhereUniqueInput
  }

  /**
   * ProgresoActividad findFirst
   */
  export type ProgresoActividadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoActividad to fetch.
     */
    where?: ProgresoActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoActividads to fetch.
     */
    orderBy?: ProgresoActividadOrderByWithRelationInput | ProgresoActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgresoActividads.
     */
    cursor?: ProgresoActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoActividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoActividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgresoActividads.
     */
    distinct?: ProgresoActividadScalarFieldEnum | ProgresoActividadScalarFieldEnum[]
  }

  /**
   * ProgresoActividad findFirstOrThrow
   */
  export type ProgresoActividadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoActividad to fetch.
     */
    where?: ProgresoActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoActividads to fetch.
     */
    orderBy?: ProgresoActividadOrderByWithRelationInput | ProgresoActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgresoActividads.
     */
    cursor?: ProgresoActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoActividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoActividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgresoActividads.
     */
    distinct?: ProgresoActividadScalarFieldEnum | ProgresoActividadScalarFieldEnum[]
  }

  /**
   * ProgresoActividad findMany
   */
  export type ProgresoActividadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoActividads to fetch.
     */
    where?: ProgresoActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoActividads to fetch.
     */
    orderBy?: ProgresoActividadOrderByWithRelationInput | ProgresoActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgresoActividads.
     */
    cursor?: ProgresoActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoActividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoActividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgresoActividads.
     */
    distinct?: ProgresoActividadScalarFieldEnum | ProgresoActividadScalarFieldEnum[]
  }

  /**
   * ProgresoActividad create
   */
  export type ProgresoActividadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgresoActividad.
     */
    data: XOR<ProgresoActividadCreateInput, ProgresoActividadUncheckedCreateInput>
  }

  /**
   * ProgresoActividad createMany
   */
  export type ProgresoActividadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgresoActividads.
     */
    data: ProgresoActividadCreateManyInput | ProgresoActividadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgresoActividad createManyAndReturn
   */
  export type ProgresoActividadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * The data used to create many ProgresoActividads.
     */
    data: ProgresoActividadCreateManyInput | ProgresoActividadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgresoActividad update
   */
  export type ProgresoActividadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgresoActividad.
     */
    data: XOR<ProgresoActividadUpdateInput, ProgresoActividadUncheckedUpdateInput>
    /**
     * Choose, which ProgresoActividad to update.
     */
    where: ProgresoActividadWhereUniqueInput
  }

  /**
   * ProgresoActividad updateMany
   */
  export type ProgresoActividadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgresoActividads.
     */
    data: XOR<ProgresoActividadUpdateManyMutationInput, ProgresoActividadUncheckedUpdateManyInput>
    /**
     * Filter which ProgresoActividads to update
     */
    where?: ProgresoActividadWhereInput
    /**
     * Limit how many ProgresoActividads to update.
     */
    limit?: number
  }

  /**
   * ProgresoActividad updateManyAndReturn
   */
  export type ProgresoActividadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * The data used to update ProgresoActividads.
     */
    data: XOR<ProgresoActividadUpdateManyMutationInput, ProgresoActividadUncheckedUpdateManyInput>
    /**
     * Filter which ProgresoActividads to update
     */
    where?: ProgresoActividadWhereInput
    /**
     * Limit how many ProgresoActividads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgresoActividad upsert
   */
  export type ProgresoActividadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgresoActividad to update in case it exists.
     */
    where: ProgresoActividadWhereUniqueInput
    /**
     * In case the ProgresoActividad found by the `where` argument doesn't exist, create a new ProgresoActividad with this data.
     */
    create: XOR<ProgresoActividadCreateInput, ProgresoActividadUncheckedCreateInput>
    /**
     * In case the ProgresoActividad was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgresoActividadUpdateInput, ProgresoActividadUncheckedUpdateInput>
  }

  /**
   * ProgresoActividad delete
   */
  export type ProgresoActividadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
    /**
     * Filter which ProgresoActividad to delete.
     */
    where: ProgresoActividadWhereUniqueInput
  }

  /**
   * ProgresoActividad deleteMany
   */
  export type ProgresoActividadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgresoActividads to delete
     */
    where?: ProgresoActividadWhereInput
    /**
     * Limit how many ProgresoActividads to delete.
     */
    limit?: number
  }

  /**
   * ProgresoActividad without action
   */
  export type ProgresoActividadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoActividad
     */
    select?: ProgresoActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoActividad
     */
    omit?: ProgresoActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoActividadInclude<ExtArgs> | null
  }


  /**
   * Model InsigniaAprendiz
   */

  export type AggregateInsigniaAprendiz = {
    _count: InsigniaAprendizCountAggregateOutputType | null
    _avg: InsigniaAprendizAvgAggregateOutputType | null
    _sum: InsigniaAprendizSumAggregateOutputType | null
    _min: InsigniaAprendizMinAggregateOutputType | null
    _max: InsigniaAprendizMaxAggregateOutputType | null
  }

  export type InsigniaAprendizAvgAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    moduloId: number | null
  }

  export type InsigniaAprendizSumAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    moduloId: number | null
  }

  export type InsigniaAprendizMinAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    moduloId: number | null
    tipo: string | null
    nombre: string | null
    descripcion: string | null
    emoji: string | null
    otorgadaAt: Date | null
  }

  export type InsigniaAprendizMaxAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    moduloId: number | null
    tipo: string | null
    nombre: string | null
    descripcion: string | null
    emoji: string | null
    otorgadaAt: Date | null
  }

  export type InsigniaAprendizCountAggregateOutputType = {
    id: number
    aprendizId: number
    cursoId: number
    moduloId: number
    tipo: number
    nombre: number
    descripcion: number
    emoji: number
    otorgadaAt: number
    _all: number
  }


  export type InsigniaAprendizAvgAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    moduloId?: true
  }

  export type InsigniaAprendizSumAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    moduloId?: true
  }

  export type InsigniaAprendizMinAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    moduloId?: true
    tipo?: true
    nombre?: true
    descripcion?: true
    emoji?: true
    otorgadaAt?: true
  }

  export type InsigniaAprendizMaxAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    moduloId?: true
    tipo?: true
    nombre?: true
    descripcion?: true
    emoji?: true
    otorgadaAt?: true
  }

  export type InsigniaAprendizCountAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    moduloId?: true
    tipo?: true
    nombre?: true
    descripcion?: true
    emoji?: true
    otorgadaAt?: true
    _all?: true
  }

  export type InsigniaAprendizAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InsigniaAprendiz to aggregate.
     */
    where?: InsigniaAprendizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsigniaAprendizs to fetch.
     */
    orderBy?: InsigniaAprendizOrderByWithRelationInput | InsigniaAprendizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InsigniaAprendizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsigniaAprendizs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsigniaAprendizs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InsigniaAprendizs
    **/
    _count?: true | InsigniaAprendizCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InsigniaAprendizAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InsigniaAprendizSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InsigniaAprendizMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InsigniaAprendizMaxAggregateInputType
  }

  export type GetInsigniaAprendizAggregateType<T extends InsigniaAprendizAggregateArgs> = {
        [P in keyof T & keyof AggregateInsigniaAprendiz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInsigniaAprendiz[P]>
      : GetScalarType<T[P], AggregateInsigniaAprendiz[P]>
  }




  export type InsigniaAprendizGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsigniaAprendizWhereInput
    orderBy?: InsigniaAprendizOrderByWithAggregationInput | InsigniaAprendizOrderByWithAggregationInput[]
    by: InsigniaAprendizScalarFieldEnum[] | InsigniaAprendizScalarFieldEnum
    having?: InsigniaAprendizScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InsigniaAprendizCountAggregateInputType | true
    _avg?: InsigniaAprendizAvgAggregateInputType
    _sum?: InsigniaAprendizSumAggregateInputType
    _min?: InsigniaAprendizMinAggregateInputType
    _max?: InsigniaAprendizMaxAggregateInputType
  }

  export type InsigniaAprendizGroupByOutputType = {
    id: number
    aprendizId: number
    cursoId: number
    moduloId: number | null
    tipo: string
    nombre: string
    descripcion: string | null
    emoji: string | null
    otorgadaAt: Date
    _count: InsigniaAprendizCountAggregateOutputType | null
    _avg: InsigniaAprendizAvgAggregateOutputType | null
    _sum: InsigniaAprendizSumAggregateOutputType | null
    _min: InsigniaAprendizMinAggregateOutputType | null
    _max: InsigniaAprendizMaxAggregateOutputType | null
  }

  type GetInsigniaAprendizGroupByPayload<T extends InsigniaAprendizGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InsigniaAprendizGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InsigniaAprendizGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InsigniaAprendizGroupByOutputType[P]>
            : GetScalarType<T[P], InsigniaAprendizGroupByOutputType[P]>
        }
      >
    >


  export type InsigniaAprendizSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    moduloId?: boolean
    tipo?: boolean
    nombre?: boolean
    descripcion?: boolean
    emoji?: boolean
    otorgadaAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insigniaAprendiz"]>

  export type InsigniaAprendizSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    moduloId?: boolean
    tipo?: boolean
    nombre?: boolean
    descripcion?: boolean
    emoji?: boolean
    otorgadaAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insigniaAprendiz"]>

  export type InsigniaAprendizSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    moduloId?: boolean
    tipo?: boolean
    nombre?: boolean
    descripcion?: boolean
    emoji?: boolean
    otorgadaAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insigniaAprendiz"]>

  export type InsigniaAprendizSelectScalar = {
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    moduloId?: boolean
    tipo?: boolean
    nombre?: boolean
    descripcion?: boolean
    emoji?: boolean
    otorgadaAt?: boolean
  }

  export type InsigniaAprendizOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aprendizId" | "cursoId" | "moduloId" | "tipo" | "nombre" | "descripcion" | "emoji" | "otorgadaAt", ExtArgs["result"]["insigniaAprendiz"]>
  export type InsigniaAprendizInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InsigniaAprendizIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InsigniaAprendizIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InsigniaAprendizPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InsigniaAprendiz"
    objects: {
      aprendiz: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      aprendizId: number
      cursoId: number
      moduloId: number | null
      tipo: string
      nombre: string
      descripcion: string | null
      emoji: string | null
      otorgadaAt: Date
    }, ExtArgs["result"]["insigniaAprendiz"]>
    composites: {}
  }

  type InsigniaAprendizGetPayload<S extends boolean | null | undefined | InsigniaAprendizDefaultArgs> = $Result.GetResult<Prisma.$InsigniaAprendizPayload, S>

  type InsigniaAprendizCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InsigniaAprendizFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InsigniaAprendizCountAggregateInputType | true
    }

  export interface InsigniaAprendizDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InsigniaAprendiz'], meta: { name: 'InsigniaAprendiz' } }
    /**
     * Find zero or one InsigniaAprendiz that matches the filter.
     * @param {InsigniaAprendizFindUniqueArgs} args - Arguments to find a InsigniaAprendiz
     * @example
     * // Get one InsigniaAprendiz
     * const insigniaAprendiz = await prisma.insigniaAprendiz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InsigniaAprendizFindUniqueArgs>(args: SelectSubset<T, InsigniaAprendizFindUniqueArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InsigniaAprendiz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InsigniaAprendizFindUniqueOrThrowArgs} args - Arguments to find a InsigniaAprendiz
     * @example
     * // Get one InsigniaAprendiz
     * const insigniaAprendiz = await prisma.insigniaAprendiz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InsigniaAprendizFindUniqueOrThrowArgs>(args: SelectSubset<T, InsigniaAprendizFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InsigniaAprendiz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizFindFirstArgs} args - Arguments to find a InsigniaAprendiz
     * @example
     * // Get one InsigniaAprendiz
     * const insigniaAprendiz = await prisma.insigniaAprendiz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InsigniaAprendizFindFirstArgs>(args?: SelectSubset<T, InsigniaAprendizFindFirstArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InsigniaAprendiz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizFindFirstOrThrowArgs} args - Arguments to find a InsigniaAprendiz
     * @example
     * // Get one InsigniaAprendiz
     * const insigniaAprendiz = await prisma.insigniaAprendiz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InsigniaAprendizFindFirstOrThrowArgs>(args?: SelectSubset<T, InsigniaAprendizFindFirstOrThrowArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InsigniaAprendizs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InsigniaAprendizs
     * const insigniaAprendizs = await prisma.insigniaAprendiz.findMany()
     * 
     * // Get first 10 InsigniaAprendizs
     * const insigniaAprendizs = await prisma.insigniaAprendiz.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const insigniaAprendizWithIdOnly = await prisma.insigniaAprendiz.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InsigniaAprendizFindManyArgs>(args?: SelectSubset<T, InsigniaAprendizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InsigniaAprendiz.
     * @param {InsigniaAprendizCreateArgs} args - Arguments to create a InsigniaAprendiz.
     * @example
     * // Create one InsigniaAprendiz
     * const InsigniaAprendiz = await prisma.insigniaAprendiz.create({
     *   data: {
     *     // ... data to create a InsigniaAprendiz
     *   }
     * })
     * 
     */
    create<T extends InsigniaAprendizCreateArgs>(args: SelectSubset<T, InsigniaAprendizCreateArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InsigniaAprendizs.
     * @param {InsigniaAprendizCreateManyArgs} args - Arguments to create many InsigniaAprendizs.
     * @example
     * // Create many InsigniaAprendizs
     * const insigniaAprendiz = await prisma.insigniaAprendiz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InsigniaAprendizCreateManyArgs>(args?: SelectSubset<T, InsigniaAprendizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InsigniaAprendizs and returns the data saved in the database.
     * @param {InsigniaAprendizCreateManyAndReturnArgs} args - Arguments to create many InsigniaAprendizs.
     * @example
     * // Create many InsigniaAprendizs
     * const insigniaAprendiz = await prisma.insigniaAprendiz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InsigniaAprendizs and only return the `id`
     * const insigniaAprendizWithIdOnly = await prisma.insigniaAprendiz.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InsigniaAprendizCreateManyAndReturnArgs>(args?: SelectSubset<T, InsigniaAprendizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InsigniaAprendiz.
     * @param {InsigniaAprendizDeleteArgs} args - Arguments to delete one InsigniaAprendiz.
     * @example
     * // Delete one InsigniaAprendiz
     * const InsigniaAprendiz = await prisma.insigniaAprendiz.delete({
     *   where: {
     *     // ... filter to delete one InsigniaAprendiz
     *   }
     * })
     * 
     */
    delete<T extends InsigniaAprendizDeleteArgs>(args: SelectSubset<T, InsigniaAprendizDeleteArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InsigniaAprendiz.
     * @param {InsigniaAprendizUpdateArgs} args - Arguments to update one InsigniaAprendiz.
     * @example
     * // Update one InsigniaAprendiz
     * const insigniaAprendiz = await prisma.insigniaAprendiz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InsigniaAprendizUpdateArgs>(args: SelectSubset<T, InsigniaAprendizUpdateArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InsigniaAprendizs.
     * @param {InsigniaAprendizDeleteManyArgs} args - Arguments to filter InsigniaAprendizs to delete.
     * @example
     * // Delete a few InsigniaAprendizs
     * const { count } = await prisma.insigniaAprendiz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InsigniaAprendizDeleteManyArgs>(args?: SelectSubset<T, InsigniaAprendizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InsigniaAprendizs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InsigniaAprendizs
     * const insigniaAprendiz = await prisma.insigniaAprendiz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InsigniaAprendizUpdateManyArgs>(args: SelectSubset<T, InsigniaAprendizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InsigniaAprendizs and returns the data updated in the database.
     * @param {InsigniaAprendizUpdateManyAndReturnArgs} args - Arguments to update many InsigniaAprendizs.
     * @example
     * // Update many InsigniaAprendizs
     * const insigniaAprendiz = await prisma.insigniaAprendiz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InsigniaAprendizs and only return the `id`
     * const insigniaAprendizWithIdOnly = await prisma.insigniaAprendiz.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InsigniaAprendizUpdateManyAndReturnArgs>(args: SelectSubset<T, InsigniaAprendizUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InsigniaAprendiz.
     * @param {InsigniaAprendizUpsertArgs} args - Arguments to update or create a InsigniaAprendiz.
     * @example
     * // Update or create a InsigniaAprendiz
     * const insigniaAprendiz = await prisma.insigniaAprendiz.upsert({
     *   create: {
     *     // ... data to create a InsigniaAprendiz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InsigniaAprendiz we want to update
     *   }
     * })
     */
    upsert<T extends InsigniaAprendizUpsertArgs>(args: SelectSubset<T, InsigniaAprendizUpsertArgs<ExtArgs>>): Prisma__InsigniaAprendizClient<$Result.GetResult<Prisma.$InsigniaAprendizPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InsigniaAprendizs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizCountArgs} args - Arguments to filter InsigniaAprendizs to count.
     * @example
     * // Count the number of InsigniaAprendizs
     * const count = await prisma.insigniaAprendiz.count({
     *   where: {
     *     // ... the filter for the InsigniaAprendizs we want to count
     *   }
     * })
    **/
    count<T extends InsigniaAprendizCountArgs>(
      args?: Subset<T, InsigniaAprendizCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InsigniaAprendizCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InsigniaAprendiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InsigniaAprendizAggregateArgs>(args: Subset<T, InsigniaAprendizAggregateArgs>): Prisma.PrismaPromise<GetInsigniaAprendizAggregateType<T>>

    /**
     * Group by InsigniaAprendiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsigniaAprendizGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InsigniaAprendizGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InsigniaAprendizGroupByArgs['orderBy'] }
        : { orderBy?: InsigniaAprendizGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InsigniaAprendizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsigniaAprendizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InsigniaAprendiz model
   */
  readonly fields: InsigniaAprendizFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InsigniaAprendiz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InsigniaAprendizClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aprendiz<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InsigniaAprendiz model
   */
  interface InsigniaAprendizFieldRefs {
    readonly id: FieldRef<"InsigniaAprendiz", 'Int'>
    readonly aprendizId: FieldRef<"InsigniaAprendiz", 'Int'>
    readonly cursoId: FieldRef<"InsigniaAprendiz", 'Int'>
    readonly moduloId: FieldRef<"InsigniaAprendiz", 'Int'>
    readonly tipo: FieldRef<"InsigniaAprendiz", 'String'>
    readonly nombre: FieldRef<"InsigniaAprendiz", 'String'>
    readonly descripcion: FieldRef<"InsigniaAprendiz", 'String'>
    readonly emoji: FieldRef<"InsigniaAprendiz", 'String'>
    readonly otorgadaAt: FieldRef<"InsigniaAprendiz", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InsigniaAprendiz findUnique
   */
  export type InsigniaAprendizFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * Filter, which InsigniaAprendiz to fetch.
     */
    where: InsigniaAprendizWhereUniqueInput
  }

  /**
   * InsigniaAprendiz findUniqueOrThrow
   */
  export type InsigniaAprendizFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * Filter, which InsigniaAprendiz to fetch.
     */
    where: InsigniaAprendizWhereUniqueInput
  }

  /**
   * InsigniaAprendiz findFirst
   */
  export type InsigniaAprendizFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * Filter, which InsigniaAprendiz to fetch.
     */
    where?: InsigniaAprendizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsigniaAprendizs to fetch.
     */
    orderBy?: InsigniaAprendizOrderByWithRelationInput | InsigniaAprendizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InsigniaAprendizs.
     */
    cursor?: InsigniaAprendizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsigniaAprendizs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsigniaAprendizs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsigniaAprendizs.
     */
    distinct?: InsigniaAprendizScalarFieldEnum | InsigniaAprendizScalarFieldEnum[]
  }

  /**
   * InsigniaAprendiz findFirstOrThrow
   */
  export type InsigniaAprendizFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * Filter, which InsigniaAprendiz to fetch.
     */
    where?: InsigniaAprendizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsigniaAprendizs to fetch.
     */
    orderBy?: InsigniaAprendizOrderByWithRelationInput | InsigniaAprendizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InsigniaAprendizs.
     */
    cursor?: InsigniaAprendizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsigniaAprendizs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsigniaAprendizs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsigniaAprendizs.
     */
    distinct?: InsigniaAprendizScalarFieldEnum | InsigniaAprendizScalarFieldEnum[]
  }

  /**
   * InsigniaAprendiz findMany
   */
  export type InsigniaAprendizFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * Filter, which InsigniaAprendizs to fetch.
     */
    where?: InsigniaAprendizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsigniaAprendizs to fetch.
     */
    orderBy?: InsigniaAprendizOrderByWithRelationInput | InsigniaAprendizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InsigniaAprendizs.
     */
    cursor?: InsigniaAprendizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsigniaAprendizs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsigniaAprendizs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsigniaAprendizs.
     */
    distinct?: InsigniaAprendizScalarFieldEnum | InsigniaAprendizScalarFieldEnum[]
  }

  /**
   * InsigniaAprendiz create
   */
  export type InsigniaAprendizCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * The data needed to create a InsigniaAprendiz.
     */
    data: XOR<InsigniaAprendizCreateInput, InsigniaAprendizUncheckedCreateInput>
  }

  /**
   * InsigniaAprendiz createMany
   */
  export type InsigniaAprendizCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InsigniaAprendizs.
     */
    data: InsigniaAprendizCreateManyInput | InsigniaAprendizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InsigniaAprendiz createManyAndReturn
   */
  export type InsigniaAprendizCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * The data used to create many InsigniaAprendizs.
     */
    data: InsigniaAprendizCreateManyInput | InsigniaAprendizCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InsigniaAprendiz update
   */
  export type InsigniaAprendizUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * The data needed to update a InsigniaAprendiz.
     */
    data: XOR<InsigniaAprendizUpdateInput, InsigniaAprendizUncheckedUpdateInput>
    /**
     * Choose, which InsigniaAprendiz to update.
     */
    where: InsigniaAprendizWhereUniqueInput
  }

  /**
   * InsigniaAprendiz updateMany
   */
  export type InsigniaAprendizUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InsigniaAprendizs.
     */
    data: XOR<InsigniaAprendizUpdateManyMutationInput, InsigniaAprendizUncheckedUpdateManyInput>
    /**
     * Filter which InsigniaAprendizs to update
     */
    where?: InsigniaAprendizWhereInput
    /**
     * Limit how many InsigniaAprendizs to update.
     */
    limit?: number
  }

  /**
   * InsigniaAprendiz updateManyAndReturn
   */
  export type InsigniaAprendizUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * The data used to update InsigniaAprendizs.
     */
    data: XOR<InsigniaAprendizUpdateManyMutationInput, InsigniaAprendizUncheckedUpdateManyInput>
    /**
     * Filter which InsigniaAprendizs to update
     */
    where?: InsigniaAprendizWhereInput
    /**
     * Limit how many InsigniaAprendizs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InsigniaAprendiz upsert
   */
  export type InsigniaAprendizUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * The filter to search for the InsigniaAprendiz to update in case it exists.
     */
    where: InsigniaAprendizWhereUniqueInput
    /**
     * In case the InsigniaAprendiz found by the `where` argument doesn't exist, create a new InsigniaAprendiz with this data.
     */
    create: XOR<InsigniaAprendizCreateInput, InsigniaAprendizUncheckedCreateInput>
    /**
     * In case the InsigniaAprendiz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InsigniaAprendizUpdateInput, InsigniaAprendizUncheckedUpdateInput>
  }

  /**
   * InsigniaAprendiz delete
   */
  export type InsigniaAprendizDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
    /**
     * Filter which InsigniaAprendiz to delete.
     */
    where: InsigniaAprendizWhereUniqueInput
  }

  /**
   * InsigniaAprendiz deleteMany
   */
  export type InsigniaAprendizDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InsigniaAprendizs to delete
     */
    where?: InsigniaAprendizWhereInput
    /**
     * Limit how many InsigniaAprendizs to delete.
     */
    limit?: number
  }

  /**
   * InsigniaAprendiz without action
   */
  export type InsigniaAprendizDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsigniaAprendiz
     */
    select?: InsigniaAprendizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsigniaAprendiz
     */
    omit?: InsigniaAprendizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsigniaAprendizInclude<ExtArgs> | null
  }


  /**
   * Model TestResultado
   */

  export type AggregateTestResultado = {
    _count: TestResultadoCountAggregateOutputType | null
    _avg: TestResultadoAvgAggregateOutputType | null
    _sum: TestResultadoSumAggregateOutputType | null
    _min: TestResultadoMinAggregateOutputType | null
    _max: TestResultadoMaxAggregateOutputType | null
  }

  export type TestResultadoAvgAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    puntaje: number | null
    total: number | null
    correctas: number | null
  }

  export type TestResultadoSumAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    puntaje: number | null
    total: number | null
    correctas: number | null
  }

  export type TestResultadoMinAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    tipo: string | null
    puntaje: number | null
    total: number | null
    correctas: number | null
    completadoAt: Date | null
  }

  export type TestResultadoMaxAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    tipo: string | null
    puntaje: number | null
    total: number | null
    correctas: number | null
    completadoAt: Date | null
  }

  export type TestResultadoCountAggregateOutputType = {
    id: number
    aprendizId: number
    cursoId: number
    tipo: number
    puntaje: number
    total: number
    correctas: number
    respuestas: number
    completadoAt: number
    _all: number
  }


  export type TestResultadoAvgAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    puntaje?: true
    total?: true
    correctas?: true
  }

  export type TestResultadoSumAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    puntaje?: true
    total?: true
    correctas?: true
  }

  export type TestResultadoMinAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    tipo?: true
    puntaje?: true
    total?: true
    correctas?: true
    completadoAt?: true
  }

  export type TestResultadoMaxAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    tipo?: true
    puntaje?: true
    total?: true
    correctas?: true
    completadoAt?: true
  }

  export type TestResultadoCountAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    tipo?: true
    puntaje?: true
    total?: true
    correctas?: true
    respuestas?: true
    completadoAt?: true
    _all?: true
  }

  export type TestResultadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestResultado to aggregate.
     */
    where?: TestResultadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResultados to fetch.
     */
    orderBy?: TestResultadoOrderByWithRelationInput | TestResultadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestResultadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResultados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResultados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestResultados
    **/
    _count?: true | TestResultadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestResultadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestResultadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestResultadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestResultadoMaxAggregateInputType
  }

  export type GetTestResultadoAggregateType<T extends TestResultadoAggregateArgs> = {
        [P in keyof T & keyof AggregateTestResultado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestResultado[P]>
      : GetScalarType<T[P], AggregateTestResultado[P]>
  }




  export type TestResultadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestResultadoWhereInput
    orderBy?: TestResultadoOrderByWithAggregationInput | TestResultadoOrderByWithAggregationInput[]
    by: TestResultadoScalarFieldEnum[] | TestResultadoScalarFieldEnum
    having?: TestResultadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestResultadoCountAggregateInputType | true
    _avg?: TestResultadoAvgAggregateInputType
    _sum?: TestResultadoSumAggregateInputType
    _min?: TestResultadoMinAggregateInputType
    _max?: TestResultadoMaxAggregateInputType
  }

  export type TestResultadoGroupByOutputType = {
    id: number
    aprendizId: number
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonValue
    completadoAt: Date
    _count: TestResultadoCountAggregateOutputType | null
    _avg: TestResultadoAvgAggregateOutputType | null
    _sum: TestResultadoSumAggregateOutputType | null
    _min: TestResultadoMinAggregateOutputType | null
    _max: TestResultadoMaxAggregateOutputType | null
  }

  type GetTestResultadoGroupByPayload<T extends TestResultadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestResultadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestResultadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestResultadoGroupByOutputType[P]>
            : GetScalarType<T[P], TestResultadoGroupByOutputType[P]>
        }
      >
    >


  export type TestResultadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    tipo?: boolean
    puntaje?: boolean
    total?: boolean
    correctas?: boolean
    respuestas?: boolean
    completadoAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResultado"]>

  export type TestResultadoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    tipo?: boolean
    puntaje?: boolean
    total?: boolean
    correctas?: boolean
    respuestas?: boolean
    completadoAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResultado"]>

  export type TestResultadoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    tipo?: boolean
    puntaje?: boolean
    total?: boolean
    correctas?: boolean
    respuestas?: boolean
    completadoAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResultado"]>

  export type TestResultadoSelectScalar = {
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    tipo?: boolean
    puntaje?: boolean
    total?: boolean
    correctas?: boolean
    respuestas?: boolean
    completadoAt?: boolean
  }

  export type TestResultadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aprendizId" | "cursoId" | "tipo" | "puntaje" | "total" | "correctas" | "respuestas" | "completadoAt", ExtArgs["result"]["testResultado"]>
  export type TestResultadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TestResultadoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TestResultadoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TestResultadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestResultado"
    objects: {
      aprendiz: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      aprendizId: number
      cursoId: number
      tipo: string
      puntaje: number
      total: number
      correctas: number
      respuestas: Prisma.JsonValue
      completadoAt: Date
    }, ExtArgs["result"]["testResultado"]>
    composites: {}
  }

  type TestResultadoGetPayload<S extends boolean | null | undefined | TestResultadoDefaultArgs> = $Result.GetResult<Prisma.$TestResultadoPayload, S>

  type TestResultadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestResultadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestResultadoCountAggregateInputType | true
    }

  export interface TestResultadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestResultado'], meta: { name: 'TestResultado' } }
    /**
     * Find zero or one TestResultado that matches the filter.
     * @param {TestResultadoFindUniqueArgs} args - Arguments to find a TestResultado
     * @example
     * // Get one TestResultado
     * const testResultado = await prisma.testResultado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestResultadoFindUniqueArgs>(args: SelectSubset<T, TestResultadoFindUniqueArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestResultado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestResultadoFindUniqueOrThrowArgs} args - Arguments to find a TestResultado
     * @example
     * // Get one TestResultado
     * const testResultado = await prisma.testResultado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestResultadoFindUniqueOrThrowArgs>(args: SelectSubset<T, TestResultadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestResultado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoFindFirstArgs} args - Arguments to find a TestResultado
     * @example
     * // Get one TestResultado
     * const testResultado = await prisma.testResultado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestResultadoFindFirstArgs>(args?: SelectSubset<T, TestResultadoFindFirstArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestResultado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoFindFirstOrThrowArgs} args - Arguments to find a TestResultado
     * @example
     * // Get one TestResultado
     * const testResultado = await prisma.testResultado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestResultadoFindFirstOrThrowArgs>(args?: SelectSubset<T, TestResultadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestResultados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestResultados
     * const testResultados = await prisma.testResultado.findMany()
     * 
     * // Get first 10 TestResultados
     * const testResultados = await prisma.testResultado.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testResultadoWithIdOnly = await prisma.testResultado.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestResultadoFindManyArgs>(args?: SelectSubset<T, TestResultadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestResultado.
     * @param {TestResultadoCreateArgs} args - Arguments to create a TestResultado.
     * @example
     * // Create one TestResultado
     * const TestResultado = await prisma.testResultado.create({
     *   data: {
     *     // ... data to create a TestResultado
     *   }
     * })
     * 
     */
    create<T extends TestResultadoCreateArgs>(args: SelectSubset<T, TestResultadoCreateArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestResultados.
     * @param {TestResultadoCreateManyArgs} args - Arguments to create many TestResultados.
     * @example
     * // Create many TestResultados
     * const testResultado = await prisma.testResultado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestResultadoCreateManyArgs>(args?: SelectSubset<T, TestResultadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestResultados and returns the data saved in the database.
     * @param {TestResultadoCreateManyAndReturnArgs} args - Arguments to create many TestResultados.
     * @example
     * // Create many TestResultados
     * const testResultado = await prisma.testResultado.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestResultados and only return the `id`
     * const testResultadoWithIdOnly = await prisma.testResultado.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestResultadoCreateManyAndReturnArgs>(args?: SelectSubset<T, TestResultadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestResultado.
     * @param {TestResultadoDeleteArgs} args - Arguments to delete one TestResultado.
     * @example
     * // Delete one TestResultado
     * const TestResultado = await prisma.testResultado.delete({
     *   where: {
     *     // ... filter to delete one TestResultado
     *   }
     * })
     * 
     */
    delete<T extends TestResultadoDeleteArgs>(args: SelectSubset<T, TestResultadoDeleteArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestResultado.
     * @param {TestResultadoUpdateArgs} args - Arguments to update one TestResultado.
     * @example
     * // Update one TestResultado
     * const testResultado = await prisma.testResultado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestResultadoUpdateArgs>(args: SelectSubset<T, TestResultadoUpdateArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestResultados.
     * @param {TestResultadoDeleteManyArgs} args - Arguments to filter TestResultados to delete.
     * @example
     * // Delete a few TestResultados
     * const { count } = await prisma.testResultado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestResultadoDeleteManyArgs>(args?: SelectSubset<T, TestResultadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestResultados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestResultados
     * const testResultado = await prisma.testResultado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestResultadoUpdateManyArgs>(args: SelectSubset<T, TestResultadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestResultados and returns the data updated in the database.
     * @param {TestResultadoUpdateManyAndReturnArgs} args - Arguments to update many TestResultados.
     * @example
     * // Update many TestResultados
     * const testResultado = await prisma.testResultado.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestResultados and only return the `id`
     * const testResultadoWithIdOnly = await prisma.testResultado.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestResultadoUpdateManyAndReturnArgs>(args: SelectSubset<T, TestResultadoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestResultado.
     * @param {TestResultadoUpsertArgs} args - Arguments to update or create a TestResultado.
     * @example
     * // Update or create a TestResultado
     * const testResultado = await prisma.testResultado.upsert({
     *   create: {
     *     // ... data to create a TestResultado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestResultado we want to update
     *   }
     * })
     */
    upsert<T extends TestResultadoUpsertArgs>(args: SelectSubset<T, TestResultadoUpsertArgs<ExtArgs>>): Prisma__TestResultadoClient<$Result.GetResult<Prisma.$TestResultadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestResultados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoCountArgs} args - Arguments to filter TestResultados to count.
     * @example
     * // Count the number of TestResultados
     * const count = await prisma.testResultado.count({
     *   where: {
     *     // ... the filter for the TestResultados we want to count
     *   }
     * })
    **/
    count<T extends TestResultadoCountArgs>(
      args?: Subset<T, TestResultadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestResultadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestResultado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestResultadoAggregateArgs>(args: Subset<T, TestResultadoAggregateArgs>): Prisma.PrismaPromise<GetTestResultadoAggregateType<T>>

    /**
     * Group by TestResultado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestResultadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestResultadoGroupByArgs['orderBy'] }
        : { orderBy?: TestResultadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestResultadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestResultadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestResultado model
   */
  readonly fields: TestResultadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestResultado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestResultadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aprendiz<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestResultado model
   */
  interface TestResultadoFieldRefs {
    readonly id: FieldRef<"TestResultado", 'Int'>
    readonly aprendizId: FieldRef<"TestResultado", 'Int'>
    readonly cursoId: FieldRef<"TestResultado", 'Int'>
    readonly tipo: FieldRef<"TestResultado", 'String'>
    readonly puntaje: FieldRef<"TestResultado", 'Float'>
    readonly total: FieldRef<"TestResultado", 'Int'>
    readonly correctas: FieldRef<"TestResultado", 'Int'>
    readonly respuestas: FieldRef<"TestResultado", 'Json'>
    readonly completadoAt: FieldRef<"TestResultado", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestResultado findUnique
   */
  export type TestResultadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * Filter, which TestResultado to fetch.
     */
    where: TestResultadoWhereUniqueInput
  }

  /**
   * TestResultado findUniqueOrThrow
   */
  export type TestResultadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * Filter, which TestResultado to fetch.
     */
    where: TestResultadoWhereUniqueInput
  }

  /**
   * TestResultado findFirst
   */
  export type TestResultadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * Filter, which TestResultado to fetch.
     */
    where?: TestResultadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResultados to fetch.
     */
    orderBy?: TestResultadoOrderByWithRelationInput | TestResultadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestResultados.
     */
    cursor?: TestResultadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResultados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResultados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResultados.
     */
    distinct?: TestResultadoScalarFieldEnum | TestResultadoScalarFieldEnum[]
  }

  /**
   * TestResultado findFirstOrThrow
   */
  export type TestResultadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * Filter, which TestResultado to fetch.
     */
    where?: TestResultadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResultados to fetch.
     */
    orderBy?: TestResultadoOrderByWithRelationInput | TestResultadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestResultados.
     */
    cursor?: TestResultadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResultados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResultados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResultados.
     */
    distinct?: TestResultadoScalarFieldEnum | TestResultadoScalarFieldEnum[]
  }

  /**
   * TestResultado findMany
   */
  export type TestResultadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * Filter, which TestResultados to fetch.
     */
    where?: TestResultadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResultados to fetch.
     */
    orderBy?: TestResultadoOrderByWithRelationInput | TestResultadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestResultados.
     */
    cursor?: TestResultadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResultados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResultados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResultados.
     */
    distinct?: TestResultadoScalarFieldEnum | TestResultadoScalarFieldEnum[]
  }

  /**
   * TestResultado create
   */
  export type TestResultadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * The data needed to create a TestResultado.
     */
    data: XOR<TestResultadoCreateInput, TestResultadoUncheckedCreateInput>
  }

  /**
   * TestResultado createMany
   */
  export type TestResultadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestResultados.
     */
    data: TestResultadoCreateManyInput | TestResultadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestResultado createManyAndReturn
   */
  export type TestResultadoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * The data used to create many TestResultados.
     */
    data: TestResultadoCreateManyInput | TestResultadoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestResultado update
   */
  export type TestResultadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * The data needed to update a TestResultado.
     */
    data: XOR<TestResultadoUpdateInput, TestResultadoUncheckedUpdateInput>
    /**
     * Choose, which TestResultado to update.
     */
    where: TestResultadoWhereUniqueInput
  }

  /**
   * TestResultado updateMany
   */
  export type TestResultadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestResultados.
     */
    data: XOR<TestResultadoUpdateManyMutationInput, TestResultadoUncheckedUpdateManyInput>
    /**
     * Filter which TestResultados to update
     */
    where?: TestResultadoWhereInput
    /**
     * Limit how many TestResultados to update.
     */
    limit?: number
  }

  /**
   * TestResultado updateManyAndReturn
   */
  export type TestResultadoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * The data used to update TestResultados.
     */
    data: XOR<TestResultadoUpdateManyMutationInput, TestResultadoUncheckedUpdateManyInput>
    /**
     * Filter which TestResultados to update
     */
    where?: TestResultadoWhereInput
    /**
     * Limit how many TestResultados to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestResultado upsert
   */
  export type TestResultadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * The filter to search for the TestResultado to update in case it exists.
     */
    where: TestResultadoWhereUniqueInput
    /**
     * In case the TestResultado found by the `where` argument doesn't exist, create a new TestResultado with this data.
     */
    create: XOR<TestResultadoCreateInput, TestResultadoUncheckedCreateInput>
    /**
     * In case the TestResultado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestResultadoUpdateInput, TestResultadoUncheckedUpdateInput>
  }

  /**
   * TestResultado delete
   */
  export type TestResultadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
    /**
     * Filter which TestResultado to delete.
     */
    where: TestResultadoWhereUniqueInput
  }

  /**
   * TestResultado deleteMany
   */
  export type TestResultadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestResultados to delete
     */
    where?: TestResultadoWhereInput
    /**
     * Limit how many TestResultados to delete.
     */
    limit?: number
  }

  /**
   * TestResultado without action
   */
  export type TestResultadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResultado
     */
    select?: TestResultadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResultado
     */
    omit?: TestResultadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultadoInclude<ExtArgs> | null
  }


  /**
   * Model Inscripcion
   */

  export type AggregateInscripcion = {
    _count: InscripcionCountAggregateOutputType | null
    _avg: InscripcionAvgAggregateOutputType | null
    _sum: InscripcionSumAggregateOutputType | null
    _min: InscripcionMinAggregateOutputType | null
    _max: InscripcionMaxAggregateOutputType | null
  }

  export type InscripcionAvgAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    progreso: number | null
  }

  export type InscripcionSumAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    progreso: number | null
  }

  export type InscripcionMinAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    progreso: number | null
    estado: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InscripcionMaxAggregateOutputType = {
    id: number | null
    aprendizId: number | null
    cursoId: number | null
    progreso: number | null
    estado: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InscripcionCountAggregateOutputType = {
    id: number
    aprendizId: number
    cursoId: number
    progreso: number
    estado: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InscripcionAvgAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    progreso?: true
  }

  export type InscripcionSumAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    progreso?: true
  }

  export type InscripcionMinAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    progreso?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InscripcionMaxAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    progreso?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InscripcionCountAggregateInputType = {
    id?: true
    aprendizId?: true
    cursoId?: true
    progreso?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InscripcionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscripcion to aggregate.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inscripcions
    **/
    _count?: true | InscripcionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InscripcionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InscripcionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InscripcionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InscripcionMaxAggregateInputType
  }

  export type GetInscripcionAggregateType<T extends InscripcionAggregateArgs> = {
        [P in keyof T & keyof AggregateInscripcion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInscripcion[P]>
      : GetScalarType<T[P], AggregateInscripcion[P]>
  }




  export type InscripcionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithAggregationInput | InscripcionOrderByWithAggregationInput[]
    by: InscripcionScalarFieldEnum[] | InscripcionScalarFieldEnum
    having?: InscripcionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InscripcionCountAggregateInputType | true
    _avg?: InscripcionAvgAggregateInputType
    _sum?: InscripcionSumAggregateInputType
    _min?: InscripcionMinAggregateInputType
    _max?: InscripcionMaxAggregateInputType
  }

  export type InscripcionGroupByOutputType = {
    id: number
    aprendizId: number
    cursoId: number
    progreso: number
    estado: string
    createdAt: Date
    updatedAt: Date
    _count: InscripcionCountAggregateOutputType | null
    _avg: InscripcionAvgAggregateOutputType | null
    _sum: InscripcionSumAggregateOutputType | null
    _min: InscripcionMinAggregateOutputType | null
    _max: InscripcionMaxAggregateOutputType | null
  }

  type GetInscripcionGroupByPayload<T extends InscripcionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InscripcionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InscripcionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
            : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
        }
      >
    >


  export type InscripcionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    progreso?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    progreso?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    progreso?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectScalar = {
    id?: boolean
    aprendizId?: boolean
    cursoId?: boolean
    progreso?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InscripcionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aprendizId" | "cursoId" | "progreso" | "estado" | "createdAt" | "updatedAt", ExtArgs["result"]["inscripcion"]>
  export type InscripcionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }
  export type InscripcionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }
  export type InscripcionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aprendiz?: boolean | UserDefaultArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }

  export type $InscripcionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inscripcion"
    objects: {
      aprendiz: Prisma.$UserPayload<ExtArgs>
      curso: Prisma.$CursoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      aprendizId: number
      cursoId: number
      progreso: number
      estado: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inscripcion"]>
    composites: {}
  }

  type InscripcionGetPayload<S extends boolean | null | undefined | InscripcionDefaultArgs> = $Result.GetResult<Prisma.$InscripcionPayload, S>

  type InscripcionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InscripcionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InscripcionCountAggregateInputType | true
    }

  export interface InscripcionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inscripcion'], meta: { name: 'Inscripcion' } }
    /**
     * Find zero or one Inscripcion that matches the filter.
     * @param {InscripcionFindUniqueArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscripcionFindUniqueArgs>(args: SelectSubset<T, InscripcionFindUniqueArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inscripcion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InscripcionFindUniqueOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscripcionFindUniqueOrThrowArgs>(args: SelectSubset<T, InscripcionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscripcion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscripcionFindFirstArgs>(args?: SelectSubset<T, InscripcionFindFirstArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscripcion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscripcionFindFirstOrThrowArgs>(args?: SelectSubset<T, InscripcionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inscripcions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany()
     * 
     * // Get first 10 Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inscripcionWithIdOnly = await prisma.inscripcion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InscripcionFindManyArgs>(args?: SelectSubset<T, InscripcionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inscripcion.
     * @param {InscripcionCreateArgs} args - Arguments to create a Inscripcion.
     * @example
     * // Create one Inscripcion
     * const Inscripcion = await prisma.inscripcion.create({
     *   data: {
     *     // ... data to create a Inscripcion
     *   }
     * })
     * 
     */
    create<T extends InscripcionCreateArgs>(args: SelectSubset<T, InscripcionCreateArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inscripcions.
     * @param {InscripcionCreateManyArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InscripcionCreateManyArgs>(args?: SelectSubset<T, InscripcionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inscripcions and returns the data saved in the database.
     * @param {InscripcionCreateManyAndReturnArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inscripcions and only return the `id`
     * const inscripcionWithIdOnly = await prisma.inscripcion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InscripcionCreateManyAndReturnArgs>(args?: SelectSubset<T, InscripcionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inscripcion.
     * @param {InscripcionDeleteArgs} args - Arguments to delete one Inscripcion.
     * @example
     * // Delete one Inscripcion
     * const Inscripcion = await prisma.inscripcion.delete({
     *   where: {
     *     // ... filter to delete one Inscripcion
     *   }
     * })
     * 
     */
    delete<T extends InscripcionDeleteArgs>(args: SelectSubset<T, InscripcionDeleteArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inscripcion.
     * @param {InscripcionUpdateArgs} args - Arguments to update one Inscripcion.
     * @example
     * // Update one Inscripcion
     * const inscripcion = await prisma.inscripcion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InscripcionUpdateArgs>(args: SelectSubset<T, InscripcionUpdateArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inscripcions.
     * @param {InscripcionDeleteManyArgs} args - Arguments to filter Inscripcions to delete.
     * @example
     * // Delete a few Inscripcions
     * const { count } = await prisma.inscripcion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InscripcionDeleteManyArgs>(args?: SelectSubset<T, InscripcionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inscripcions
     * const inscripcion = await prisma.inscripcion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InscripcionUpdateManyArgs>(args: SelectSubset<T, InscripcionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscripcions and returns the data updated in the database.
     * @param {InscripcionUpdateManyAndReturnArgs} args - Arguments to update many Inscripcions.
     * @example
     * // Update many Inscripcions
     * const inscripcion = await prisma.inscripcion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inscripcions and only return the `id`
     * const inscripcionWithIdOnly = await prisma.inscripcion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InscripcionUpdateManyAndReturnArgs>(args: SelectSubset<T, InscripcionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inscripcion.
     * @param {InscripcionUpsertArgs} args - Arguments to update or create a Inscripcion.
     * @example
     * // Update or create a Inscripcion
     * const inscripcion = await prisma.inscripcion.upsert({
     *   create: {
     *     // ... data to create a Inscripcion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inscripcion we want to update
     *   }
     * })
     */
    upsert<T extends InscripcionUpsertArgs>(args: SelectSubset<T, InscripcionUpsertArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionCountArgs} args - Arguments to filter Inscripcions to count.
     * @example
     * // Count the number of Inscripcions
     * const count = await prisma.inscripcion.count({
     *   where: {
     *     // ... the filter for the Inscripcions we want to count
     *   }
     * })
    **/
    count<T extends InscripcionCountArgs>(
      args?: Subset<T, InscripcionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InscripcionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InscripcionAggregateArgs>(args: Subset<T, InscripcionAggregateArgs>): Prisma.PrismaPromise<GetInscripcionAggregateType<T>>

    /**
     * Group by Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InscripcionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscripcionGroupByArgs['orderBy'] }
        : { orderBy?: InscripcionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InscripcionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInscripcionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inscripcion model
   */
  readonly fields: InscripcionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inscripcion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscripcionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aprendiz<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    curso<T extends CursoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CursoDefaultArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inscripcion model
   */
  interface InscripcionFieldRefs {
    readonly id: FieldRef<"Inscripcion", 'Int'>
    readonly aprendizId: FieldRef<"Inscripcion", 'Int'>
    readonly cursoId: FieldRef<"Inscripcion", 'Int'>
    readonly progreso: FieldRef<"Inscripcion", 'Float'>
    readonly estado: FieldRef<"Inscripcion", 'String'>
    readonly createdAt: FieldRef<"Inscripcion", 'DateTime'>
    readonly updatedAt: FieldRef<"Inscripcion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inscripcion findUnique
   */
  export type InscripcionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion findUniqueOrThrow
   */
  export type InscripcionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion findFirst
   */
  export type InscripcionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion findFirstOrThrow
   */
  export type InscripcionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion findMany
   */
  export type InscripcionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcions to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion create
   */
  export type InscripcionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The data needed to create a Inscripcion.
     */
    data: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>
  }

  /**
   * Inscripcion createMany
   */
  export type InscripcionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inscripcion createManyAndReturn
   */
  export type InscripcionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscripcion update
   */
  export type InscripcionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The data needed to update a Inscripcion.
     */
    data: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>
    /**
     * Choose, which Inscripcion to update.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion updateMany
   */
  export type InscripcionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inscripcions.
     */
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Inscripcions to update
     */
    where?: InscripcionWhereInput
    /**
     * Limit how many Inscripcions to update.
     */
    limit?: number
  }

  /**
   * Inscripcion updateManyAndReturn
   */
  export type InscripcionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * The data used to update Inscripcions.
     */
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Inscripcions to update
     */
    where?: InscripcionWhereInput
    /**
     * Limit how many Inscripcions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscripcion upsert
   */
  export type InscripcionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The filter to search for the Inscripcion to update in case it exists.
     */
    where: InscripcionWhereUniqueInput
    /**
     * In case the Inscripcion found by the `where` argument doesn't exist, create a new Inscripcion with this data.
     */
    create: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>
    /**
     * In case the Inscripcion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>
  }

  /**
   * Inscripcion delete
   */
  export type InscripcionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter which Inscripcion to delete.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion deleteMany
   */
  export type InscripcionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscripcions to delete
     */
    where?: InscripcionWhereInput
    /**
     * Limit how many Inscripcions to delete.
     */
    limit?: number
  }

  /**
   * Inscripcion without action
   */
  export type InscripcionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
    recursoId: number | null
    usuarioId: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
    recursoId: number | null
    usuarioId: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    accion: string | null
    recurso: string | null
    recursoId: number | null
    detalle: string | null
    usuarioId: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    accion: string | null
    recurso: string | null
    recursoId: number | null
    detalle: string | null
    usuarioId: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    accion: number
    recurso: number
    recursoId: number
    detalle: number
    usuarioId: number
    ip: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
    recursoId?: true
    usuarioId?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
    recursoId?: true
    usuarioId?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    accion?: true
    recurso?: true
    recursoId?: true
    detalle?: true
    usuarioId?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    accion?: true
    recurso?: true
    recursoId?: true
    detalle?: true
    usuarioId?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    accion?: true
    recurso?: true
    recursoId?: true
    detalle?: true
    usuarioId?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    accion: string
    recurso: string
    recursoId: number | null
    detalle: string | null
    usuarioId: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accion?: boolean
    recurso?: boolean
    recursoId?: boolean
    detalle?: boolean
    usuarioId?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
    usuario?: boolean | AuditLog$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accion?: boolean
    recurso?: boolean
    recursoId?: boolean
    detalle?: boolean
    usuarioId?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
    usuario?: boolean | AuditLog$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accion?: boolean
    recurso?: boolean
    recursoId?: boolean
    detalle?: boolean
    usuarioId?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
    usuario?: boolean | AuditLog$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    accion?: boolean
    recurso?: boolean
    recursoId?: boolean
    detalle?: boolean
    usuarioId?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accion" | "recurso" | "recursoId" | "detalle" | "usuarioId" | "ip" | "userAgent" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | AuditLog$usuarioArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | AuditLog$usuarioArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | AuditLog$usuarioArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      usuario: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      accion: string
      recurso: string
      recursoId: number | null
      detalle: string | null
      usuarioId: number | null
      ip: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends AuditLog$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$usuarioArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly accion: FieldRef<"AuditLog", 'String'>
    readonly recurso: FieldRef<"AuditLog", 'String'>
    readonly recursoId: FieldRef<"AuditLog", 'Int'>
    readonly detalle: FieldRef<"AuditLog", 'String'>
    readonly usuarioId: FieldRef<"AuditLog", 'Int'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.usuario
   */
  export type AuditLog$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Notificacion
   */

  export type AggregateNotificacion = {
    _count: NotificacionCountAggregateOutputType | null
    _avg: NotificacionAvgAggregateOutputType | null
    _sum: NotificacionSumAggregateOutputType | null
    _min: NotificacionMinAggregateOutputType | null
    _max: NotificacionMaxAggregateOutputType | null
  }

  export type NotificacionAvgAggregateOutputType = {
    id: number | null
    destinatarioId: number | null
  }

  export type NotificacionSumAggregateOutputType = {
    id: number | null
    destinatarioId: number | null
  }

  export type NotificacionMinAggregateOutputType = {
    id: number | null
    tipo: string | null
    asunto: string | null
    mensaje: string | null
    destinatarioId: number | null
    leida: boolean | null
    enviadoPorEmail: boolean | null
    createdAt: Date | null
  }

  export type NotificacionMaxAggregateOutputType = {
    id: number | null
    tipo: string | null
    asunto: string | null
    mensaje: string | null
    destinatarioId: number | null
    leida: boolean | null
    enviadoPorEmail: boolean | null
    createdAt: Date | null
  }

  export type NotificacionCountAggregateOutputType = {
    id: number
    tipo: number
    asunto: number
    mensaje: number
    destinatarioId: number
    leida: number
    enviadoPorEmail: number
    createdAt: number
    _all: number
  }


  export type NotificacionAvgAggregateInputType = {
    id?: true
    destinatarioId?: true
  }

  export type NotificacionSumAggregateInputType = {
    id?: true
    destinatarioId?: true
  }

  export type NotificacionMinAggregateInputType = {
    id?: true
    tipo?: true
    asunto?: true
    mensaje?: true
    destinatarioId?: true
    leida?: true
    enviadoPorEmail?: true
    createdAt?: true
  }

  export type NotificacionMaxAggregateInputType = {
    id?: true
    tipo?: true
    asunto?: true
    mensaje?: true
    destinatarioId?: true
    leida?: true
    enviadoPorEmail?: true
    createdAt?: true
  }

  export type NotificacionCountAggregateInputType = {
    id?: true
    tipo?: true
    asunto?: true
    mensaje?: true
    destinatarioId?: true
    leida?: true
    enviadoPorEmail?: true
    createdAt?: true
    _all?: true
  }

  export type NotificacionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notificacion to aggregate.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notificacions
    **/
    _count?: true | NotificacionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificacionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificacionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificacionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificacionMaxAggregateInputType
  }

  export type GetNotificacionAggregateType<T extends NotificacionAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificacion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificacion[P]>
      : GetScalarType<T[P], AggregateNotificacion[P]>
  }




  export type NotificacionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacionWhereInput
    orderBy?: NotificacionOrderByWithAggregationInput | NotificacionOrderByWithAggregationInput[]
    by: NotificacionScalarFieldEnum[] | NotificacionScalarFieldEnum
    having?: NotificacionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificacionCountAggregateInputType | true
    _avg?: NotificacionAvgAggregateInputType
    _sum?: NotificacionSumAggregateInputType
    _min?: NotificacionMinAggregateInputType
    _max?: NotificacionMaxAggregateInputType
  }

  export type NotificacionGroupByOutputType = {
    id: number
    tipo: string
    asunto: string
    mensaje: string
    destinatarioId: number
    leida: boolean
    enviadoPorEmail: boolean
    createdAt: Date
    _count: NotificacionCountAggregateOutputType | null
    _avg: NotificacionAvgAggregateOutputType | null
    _sum: NotificacionSumAggregateOutputType | null
    _min: NotificacionMinAggregateOutputType | null
    _max: NotificacionMaxAggregateOutputType | null
  }

  type GetNotificacionGroupByPayload<T extends NotificacionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificacionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificacionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificacionGroupByOutputType[P]>
            : GetScalarType<T[P], NotificacionGroupByOutputType[P]>
        }
      >
    >


  export type NotificacionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    asunto?: boolean
    mensaje?: boolean
    destinatarioId?: boolean
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: boolean
    destinatario?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacion"]>

  export type NotificacionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    asunto?: boolean
    mensaje?: boolean
    destinatarioId?: boolean
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: boolean
    destinatario?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacion"]>

  export type NotificacionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    asunto?: boolean
    mensaje?: boolean
    destinatarioId?: boolean
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: boolean
    destinatario?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacion"]>

  export type NotificacionSelectScalar = {
    id?: boolean
    tipo?: boolean
    asunto?: boolean
    mensaje?: boolean
    destinatarioId?: boolean
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: boolean
  }

  export type NotificacionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "asunto" | "mensaje" | "destinatarioId" | "leida" | "enviadoPorEmail" | "createdAt", ExtArgs["result"]["notificacion"]>
  export type NotificacionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    destinatario?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificacionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    destinatario?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificacionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    destinatario?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificacionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notificacion"
    objects: {
      destinatario: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tipo: string
      asunto: string
      mensaje: string
      destinatarioId: number
      leida: boolean
      enviadoPorEmail: boolean
      createdAt: Date
    }, ExtArgs["result"]["notificacion"]>
    composites: {}
  }

  type NotificacionGetPayload<S extends boolean | null | undefined | NotificacionDefaultArgs> = $Result.GetResult<Prisma.$NotificacionPayload, S>

  type NotificacionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificacionCountAggregateInputType | true
    }

  export interface NotificacionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notificacion'], meta: { name: 'Notificacion' } }
    /**
     * Find zero or one Notificacion that matches the filter.
     * @param {NotificacionFindUniqueArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificacionFindUniqueArgs>(args: SelectSubset<T, NotificacionFindUniqueArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notificacion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificacionFindUniqueOrThrowArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificacionFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionFindFirstArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificacionFindFirstArgs>(args?: SelectSubset<T, NotificacionFindFirstArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionFindFirstOrThrowArgs} args - Arguments to find a Notificacion
     * @example
     * // Get one Notificacion
     * const notificacion = await prisma.notificacion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificacionFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificacionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notificacions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notificacions
     * const notificacions = await prisma.notificacion.findMany()
     * 
     * // Get first 10 Notificacions
     * const notificacions = await prisma.notificacion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificacionWithIdOnly = await prisma.notificacion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificacionFindManyArgs>(args?: SelectSubset<T, NotificacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notificacion.
     * @param {NotificacionCreateArgs} args - Arguments to create a Notificacion.
     * @example
     * // Create one Notificacion
     * const Notificacion = await prisma.notificacion.create({
     *   data: {
     *     // ... data to create a Notificacion
     *   }
     * })
     * 
     */
    create<T extends NotificacionCreateArgs>(args: SelectSubset<T, NotificacionCreateArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notificacions.
     * @param {NotificacionCreateManyArgs} args - Arguments to create many Notificacions.
     * @example
     * // Create many Notificacions
     * const notificacion = await prisma.notificacion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificacionCreateManyArgs>(args?: SelectSubset<T, NotificacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notificacions and returns the data saved in the database.
     * @param {NotificacionCreateManyAndReturnArgs} args - Arguments to create many Notificacions.
     * @example
     * // Create many Notificacions
     * const notificacion = await prisma.notificacion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notificacions and only return the `id`
     * const notificacionWithIdOnly = await prisma.notificacion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificacionCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notificacion.
     * @param {NotificacionDeleteArgs} args - Arguments to delete one Notificacion.
     * @example
     * // Delete one Notificacion
     * const Notificacion = await prisma.notificacion.delete({
     *   where: {
     *     // ... filter to delete one Notificacion
     *   }
     * })
     * 
     */
    delete<T extends NotificacionDeleteArgs>(args: SelectSubset<T, NotificacionDeleteArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notificacion.
     * @param {NotificacionUpdateArgs} args - Arguments to update one Notificacion.
     * @example
     * // Update one Notificacion
     * const notificacion = await prisma.notificacion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificacionUpdateArgs>(args: SelectSubset<T, NotificacionUpdateArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notificacions.
     * @param {NotificacionDeleteManyArgs} args - Arguments to filter Notificacions to delete.
     * @example
     * // Delete a few Notificacions
     * const { count } = await prisma.notificacion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificacionDeleteManyArgs>(args?: SelectSubset<T, NotificacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notificacions
     * const notificacion = await prisma.notificacion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificacionUpdateManyArgs>(args: SelectSubset<T, NotificacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacions and returns the data updated in the database.
     * @param {NotificacionUpdateManyAndReturnArgs} args - Arguments to update many Notificacions.
     * @example
     * // Update many Notificacions
     * const notificacion = await prisma.notificacion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notificacions and only return the `id`
     * const notificacionWithIdOnly = await prisma.notificacion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificacionUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notificacion.
     * @param {NotificacionUpsertArgs} args - Arguments to update or create a Notificacion.
     * @example
     * // Update or create a Notificacion
     * const notificacion = await prisma.notificacion.upsert({
     *   create: {
     *     // ... data to create a Notificacion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notificacion we want to update
     *   }
     * })
     */
    upsert<T extends NotificacionUpsertArgs>(args: SelectSubset<T, NotificacionUpsertArgs<ExtArgs>>): Prisma__NotificacionClient<$Result.GetResult<Prisma.$NotificacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notificacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionCountArgs} args - Arguments to filter Notificacions to count.
     * @example
     * // Count the number of Notificacions
     * const count = await prisma.notificacion.count({
     *   where: {
     *     // ... the filter for the Notificacions we want to count
     *   }
     * })
    **/
    count<T extends NotificacionCountArgs>(
      args?: Subset<T, NotificacionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificacionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notificacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificacionAggregateArgs>(args: Subset<T, NotificacionAggregateArgs>): Prisma.PrismaPromise<GetNotificacionAggregateType<T>>

    /**
     * Group by Notificacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificacionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificacionGroupByArgs['orderBy'] }
        : { orderBy?: NotificacionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notificacion model
   */
  readonly fields: NotificacionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notificacion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificacionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    destinatario<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notificacion model
   */
  interface NotificacionFieldRefs {
    readonly id: FieldRef<"Notificacion", 'Int'>
    readonly tipo: FieldRef<"Notificacion", 'String'>
    readonly asunto: FieldRef<"Notificacion", 'String'>
    readonly mensaje: FieldRef<"Notificacion", 'String'>
    readonly destinatarioId: FieldRef<"Notificacion", 'Int'>
    readonly leida: FieldRef<"Notificacion", 'Boolean'>
    readonly enviadoPorEmail: FieldRef<"Notificacion", 'Boolean'>
    readonly createdAt: FieldRef<"Notificacion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notificacion findUnique
   */
  export type NotificacionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion findUniqueOrThrow
   */
  export type NotificacionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion findFirst
   */
  export type NotificacionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notificacions.
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacions.
     */
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Notificacion findFirstOrThrow
   */
  export type NotificacionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacion to fetch.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notificacions.
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacions.
     */
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Notificacion findMany
   */
  export type NotificacionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter, which Notificacions to fetch.
     */
    where?: NotificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacions to fetch.
     */
    orderBy?: NotificacionOrderByWithRelationInput | NotificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notificacions.
     */
    cursor?: NotificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacions.
     */
    distinct?: NotificacionScalarFieldEnum | NotificacionScalarFieldEnum[]
  }

  /**
   * Notificacion create
   */
  export type NotificacionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * The data needed to create a Notificacion.
     */
    data: XOR<NotificacionCreateInput, NotificacionUncheckedCreateInput>
  }

  /**
   * Notificacion createMany
   */
  export type NotificacionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notificacions.
     */
    data: NotificacionCreateManyInput | NotificacionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notificacion createManyAndReturn
   */
  export type NotificacionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * The data used to create many Notificacions.
     */
    data: NotificacionCreateManyInput | NotificacionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notificacion update
   */
  export type NotificacionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * The data needed to update a Notificacion.
     */
    data: XOR<NotificacionUpdateInput, NotificacionUncheckedUpdateInput>
    /**
     * Choose, which Notificacion to update.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion updateMany
   */
  export type NotificacionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notificacions.
     */
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyInput>
    /**
     * Filter which Notificacions to update
     */
    where?: NotificacionWhereInput
    /**
     * Limit how many Notificacions to update.
     */
    limit?: number
  }

  /**
   * Notificacion updateManyAndReturn
   */
  export type NotificacionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * The data used to update Notificacions.
     */
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyInput>
    /**
     * Filter which Notificacions to update
     */
    where?: NotificacionWhereInput
    /**
     * Limit how many Notificacions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notificacion upsert
   */
  export type NotificacionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * The filter to search for the Notificacion to update in case it exists.
     */
    where: NotificacionWhereUniqueInput
    /**
     * In case the Notificacion found by the `where` argument doesn't exist, create a new Notificacion with this data.
     */
    create: XOR<NotificacionCreateInput, NotificacionUncheckedCreateInput>
    /**
     * In case the Notificacion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificacionUpdateInput, NotificacionUncheckedUpdateInput>
  }

  /**
   * Notificacion delete
   */
  export type NotificacionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
    /**
     * Filter which Notificacion to delete.
     */
    where: NotificacionWhereUniqueInput
  }

  /**
   * Notificacion deleteMany
   */
  export type NotificacionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notificacions to delete
     */
    where?: NotificacionWhereInput
    /**
     * Limit how many Notificacions to delete.
     */
    limit?: number
  }

  /**
   * Notificacion without action
   */
  export type NotificacionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacion
     */
    select?: NotificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacion
     */
    omit?: NotificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    correo_usuario: 'correo_usuario',
    passw_usuario: 'passw_usuario',
    nombre_usuario: 'nombre_usuario',
    estado_usuario: 'estado_usuario',
    rol_usuario: 'rol_usuario',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CursoScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descripcion: 'descripcion',
    nivel: 'nivel',
    estado: 'estado',
    instructorId: 'instructorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CursoScalarFieldEnum = (typeof CursoScalarFieldEnum)[keyof typeof CursoScalarFieldEnum]


  export const ModuloScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descripcion: 'descripcion',
    contenido: 'contenido',
    orden: 'orden',
    estado: 'estado',
    cursoId: 'cursoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ModuloScalarFieldEnum = (typeof ModuloScalarFieldEnum)[keyof typeof ModuloScalarFieldEnum]


  export const MomentoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    tipo: 'tipo',
    orden: 'orden',
    moduloId: 'moduloId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MomentoScalarFieldEnum = (typeof MomentoScalarFieldEnum)[keyof typeof MomentoScalarFieldEnum]


  export const ActividadScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    titulo: 'titulo',
    instrucciones: 'instrucciones',
    contenido: 'contenido',
    orden: 'orden',
    estado: 'estado',
    momentoId: 'momentoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActividadScalarFieldEnum = (typeof ActividadScalarFieldEnum)[keyof typeof ActividadScalarFieldEnum]


  export const ProgresoActividadScalarFieldEnum: {
    id: 'id',
    aprendizId: 'aprendizId',
    actividadId: 'actividadId',
    completada: 'completada',
    intentos: 'intentos',
    puntaje: 'puntaje',
    respuesta: 'respuesta',
    completadoAt: 'completadoAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgresoActividadScalarFieldEnum = (typeof ProgresoActividadScalarFieldEnum)[keyof typeof ProgresoActividadScalarFieldEnum]


  export const InsigniaAprendizScalarFieldEnum: {
    id: 'id',
    aprendizId: 'aprendizId',
    cursoId: 'cursoId',
    moduloId: 'moduloId',
    tipo: 'tipo',
    nombre: 'nombre',
    descripcion: 'descripcion',
    emoji: 'emoji',
    otorgadaAt: 'otorgadaAt'
  };

  export type InsigniaAprendizScalarFieldEnum = (typeof InsigniaAprendizScalarFieldEnum)[keyof typeof InsigniaAprendizScalarFieldEnum]


  export const TestResultadoScalarFieldEnum: {
    id: 'id',
    aprendizId: 'aprendizId',
    cursoId: 'cursoId',
    tipo: 'tipo',
    puntaje: 'puntaje',
    total: 'total',
    correctas: 'correctas',
    respuestas: 'respuestas',
    completadoAt: 'completadoAt'
  };

  export type TestResultadoScalarFieldEnum = (typeof TestResultadoScalarFieldEnum)[keyof typeof TestResultadoScalarFieldEnum]


  export const InscripcionScalarFieldEnum: {
    id: 'id',
    aprendizId: 'aprendizId',
    cursoId: 'cursoId',
    progreso: 'progreso',
    estado: 'estado',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InscripcionScalarFieldEnum = (typeof InscripcionScalarFieldEnum)[keyof typeof InscripcionScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    accion: 'accion',
    recurso: 'recurso',
    recursoId: 'recursoId',
    detalle: 'detalle',
    usuarioId: 'usuarioId',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const NotificacionScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    asunto: 'asunto',
    mensaje: 'mensaje',
    destinatarioId: 'destinatarioId',
    leida: 'leida',
    enviadoPorEmail: 'enviadoPorEmail',
    createdAt: 'createdAt'
  };

  export type NotificacionScalarFieldEnum = (typeof NotificacionScalarFieldEnum)[keyof typeof NotificacionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    correo_usuario?: StringFilter<"User"> | string
    passw_usuario?: StringFilter<"User"> | string
    nombre_usuario?: StringNullableFilter<"User"> | string | null
    estado_usuario?: BoolFilter<"User"> | boolean
    rol_usuario?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cursosComoInstructor?: CursoListRelationFilter
    inscripciones?: InscripcionListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    notificaciones?: NotificacionListRelationFilter
    progresoActividades?: ProgresoActividadListRelationFilter
    insignias?: InsigniaAprendizListRelationFilter
    testResultados?: TestResultadoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    correo_usuario?: SortOrder
    passw_usuario?: SortOrder
    nombre_usuario?: SortOrderInput | SortOrder
    estado_usuario?: SortOrder
    rol_usuario?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cursosComoInstructor?: CursoOrderByRelationAggregateInput
    inscripciones?: InscripcionOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    notificaciones?: NotificacionOrderByRelationAggregateInput
    progresoActividades?: ProgresoActividadOrderByRelationAggregateInput
    insignias?: InsigniaAprendizOrderByRelationAggregateInput
    testResultados?: TestResultadoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    correo_usuario?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passw_usuario?: StringFilter<"User"> | string
    nombre_usuario?: StringNullableFilter<"User"> | string | null
    estado_usuario?: BoolFilter<"User"> | boolean
    rol_usuario?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cursosComoInstructor?: CursoListRelationFilter
    inscripciones?: InscripcionListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    notificaciones?: NotificacionListRelationFilter
    progresoActividades?: ProgresoActividadListRelationFilter
    insignias?: InsigniaAprendizListRelationFilter
    testResultados?: TestResultadoListRelationFilter
  }, "id" | "correo_usuario">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    correo_usuario?: SortOrder
    passw_usuario?: SortOrder
    nombre_usuario?: SortOrderInput | SortOrder
    estado_usuario?: SortOrder
    rol_usuario?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    correo_usuario?: StringWithAggregatesFilter<"User"> | string
    passw_usuario?: StringWithAggregatesFilter<"User"> | string
    nombre_usuario?: StringNullableWithAggregatesFilter<"User"> | string | null
    estado_usuario?: BoolWithAggregatesFilter<"User"> | boolean
    rol_usuario?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CursoWhereInput = {
    AND?: CursoWhereInput | CursoWhereInput[]
    OR?: CursoWhereInput[]
    NOT?: CursoWhereInput | CursoWhereInput[]
    id?: IntFilter<"Curso"> | number
    titulo?: StringFilter<"Curso"> | string
    descripcion?: StringNullableFilter<"Curso"> | string | null
    nivel?: StringFilter<"Curso"> | string
    estado?: BoolFilter<"Curso"> | boolean
    instructorId?: IntFilter<"Curso"> | number
    createdAt?: DateTimeFilter<"Curso"> | Date | string
    updatedAt?: DateTimeFilter<"Curso"> | Date | string
    instructor?: XOR<UserScalarRelationFilter, UserWhereInput>
    modulos?: ModuloListRelationFilter
    inscripciones?: InscripcionListRelationFilter
  }

  export type CursoOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    nivel?: SortOrder
    estado?: SortOrder
    instructorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instructor?: UserOrderByWithRelationInput
    modulos?: ModuloOrderByRelationAggregateInput
    inscripciones?: InscripcionOrderByRelationAggregateInput
  }

  export type CursoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CursoWhereInput | CursoWhereInput[]
    OR?: CursoWhereInput[]
    NOT?: CursoWhereInput | CursoWhereInput[]
    titulo?: StringFilter<"Curso"> | string
    descripcion?: StringNullableFilter<"Curso"> | string | null
    nivel?: StringFilter<"Curso"> | string
    estado?: BoolFilter<"Curso"> | boolean
    instructorId?: IntFilter<"Curso"> | number
    createdAt?: DateTimeFilter<"Curso"> | Date | string
    updatedAt?: DateTimeFilter<"Curso"> | Date | string
    instructor?: XOR<UserScalarRelationFilter, UserWhereInput>
    modulos?: ModuloListRelationFilter
    inscripciones?: InscripcionListRelationFilter
  }, "id">

  export type CursoOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    nivel?: SortOrder
    estado?: SortOrder
    instructorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CursoCountOrderByAggregateInput
    _avg?: CursoAvgOrderByAggregateInput
    _max?: CursoMaxOrderByAggregateInput
    _min?: CursoMinOrderByAggregateInput
    _sum?: CursoSumOrderByAggregateInput
  }

  export type CursoScalarWhereWithAggregatesInput = {
    AND?: CursoScalarWhereWithAggregatesInput | CursoScalarWhereWithAggregatesInput[]
    OR?: CursoScalarWhereWithAggregatesInput[]
    NOT?: CursoScalarWhereWithAggregatesInput | CursoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Curso"> | number
    titulo?: StringWithAggregatesFilter<"Curso"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Curso"> | string | null
    nivel?: StringWithAggregatesFilter<"Curso"> | string
    estado?: BoolWithAggregatesFilter<"Curso"> | boolean
    instructorId?: IntWithAggregatesFilter<"Curso"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Curso"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Curso"> | Date | string
  }

  export type ModuloWhereInput = {
    AND?: ModuloWhereInput | ModuloWhereInput[]
    OR?: ModuloWhereInput[]
    NOT?: ModuloWhereInput | ModuloWhereInput[]
    id?: IntFilter<"Modulo"> | number
    titulo?: StringFilter<"Modulo"> | string
    descripcion?: StringNullableFilter<"Modulo"> | string | null
    contenido?: StringNullableFilter<"Modulo"> | string | null
    orden?: IntFilter<"Modulo"> | number
    estado?: BoolFilter<"Modulo"> | boolean
    cursoId?: IntFilter<"Modulo"> | number
    createdAt?: DateTimeFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeFilter<"Modulo"> | Date | string
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
    momentos?: MomentoListRelationFilter
  }

  export type ModuloOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    contenido?: SortOrderInput | SortOrder
    orden?: SortOrder
    estado?: SortOrder
    cursoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    curso?: CursoOrderByWithRelationInput
    momentos?: MomentoOrderByRelationAggregateInput
  }

  export type ModuloWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ModuloWhereInput | ModuloWhereInput[]
    OR?: ModuloWhereInput[]
    NOT?: ModuloWhereInput | ModuloWhereInput[]
    titulo?: StringFilter<"Modulo"> | string
    descripcion?: StringNullableFilter<"Modulo"> | string | null
    contenido?: StringNullableFilter<"Modulo"> | string | null
    orden?: IntFilter<"Modulo"> | number
    estado?: BoolFilter<"Modulo"> | boolean
    cursoId?: IntFilter<"Modulo"> | number
    createdAt?: DateTimeFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeFilter<"Modulo"> | Date | string
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
    momentos?: MomentoListRelationFilter
  }, "id">

  export type ModuloOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    contenido?: SortOrderInput | SortOrder
    orden?: SortOrder
    estado?: SortOrder
    cursoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ModuloCountOrderByAggregateInput
    _avg?: ModuloAvgOrderByAggregateInput
    _max?: ModuloMaxOrderByAggregateInput
    _min?: ModuloMinOrderByAggregateInput
    _sum?: ModuloSumOrderByAggregateInput
  }

  export type ModuloScalarWhereWithAggregatesInput = {
    AND?: ModuloScalarWhereWithAggregatesInput | ModuloScalarWhereWithAggregatesInput[]
    OR?: ModuloScalarWhereWithAggregatesInput[]
    NOT?: ModuloScalarWhereWithAggregatesInput | ModuloScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Modulo"> | number
    titulo?: StringWithAggregatesFilter<"Modulo"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Modulo"> | string | null
    contenido?: StringNullableWithAggregatesFilter<"Modulo"> | string | null
    orden?: IntWithAggregatesFilter<"Modulo"> | number
    estado?: BoolWithAggregatesFilter<"Modulo"> | boolean
    cursoId?: IntWithAggregatesFilter<"Modulo"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Modulo"> | Date | string
  }

  export type MomentoWhereInput = {
    AND?: MomentoWhereInput | MomentoWhereInput[]
    OR?: MomentoWhereInput[]
    NOT?: MomentoWhereInput | MomentoWhereInput[]
    id?: IntFilter<"Momento"> | number
    nombre?: StringFilter<"Momento"> | string
    tipo?: StringFilter<"Momento"> | string
    orden?: IntFilter<"Momento"> | number
    moduloId?: IntFilter<"Momento"> | number
    createdAt?: DateTimeFilter<"Momento"> | Date | string
    updatedAt?: DateTimeFilter<"Momento"> | Date | string
    modulo?: XOR<ModuloScalarRelationFilter, ModuloWhereInput>
    actividades?: ActividadListRelationFilter
  }

  export type MomentoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modulo?: ModuloOrderByWithRelationInput
    actividades?: ActividadOrderByRelationAggregateInput
  }

  export type MomentoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MomentoWhereInput | MomentoWhereInput[]
    OR?: MomentoWhereInput[]
    NOT?: MomentoWhereInput | MomentoWhereInput[]
    nombre?: StringFilter<"Momento"> | string
    tipo?: StringFilter<"Momento"> | string
    orden?: IntFilter<"Momento"> | number
    moduloId?: IntFilter<"Momento"> | number
    createdAt?: DateTimeFilter<"Momento"> | Date | string
    updatedAt?: DateTimeFilter<"Momento"> | Date | string
    modulo?: XOR<ModuloScalarRelationFilter, ModuloWhereInput>
    actividades?: ActividadListRelationFilter
  }, "id">

  export type MomentoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MomentoCountOrderByAggregateInput
    _avg?: MomentoAvgOrderByAggregateInput
    _max?: MomentoMaxOrderByAggregateInput
    _min?: MomentoMinOrderByAggregateInput
    _sum?: MomentoSumOrderByAggregateInput
  }

  export type MomentoScalarWhereWithAggregatesInput = {
    AND?: MomentoScalarWhereWithAggregatesInput | MomentoScalarWhereWithAggregatesInput[]
    OR?: MomentoScalarWhereWithAggregatesInput[]
    NOT?: MomentoScalarWhereWithAggregatesInput | MomentoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Momento"> | number
    nombre?: StringWithAggregatesFilter<"Momento"> | string
    tipo?: StringWithAggregatesFilter<"Momento"> | string
    orden?: IntWithAggregatesFilter<"Momento"> | number
    moduloId?: IntWithAggregatesFilter<"Momento"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Momento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Momento"> | Date | string
  }

  export type ActividadWhereInput = {
    AND?: ActividadWhereInput | ActividadWhereInput[]
    OR?: ActividadWhereInput[]
    NOT?: ActividadWhereInput | ActividadWhereInput[]
    id?: IntFilter<"Actividad"> | number
    tipo?: StringFilter<"Actividad"> | string
    titulo?: StringFilter<"Actividad"> | string
    instrucciones?: StringNullableFilter<"Actividad"> | string | null
    contenido?: JsonFilter<"Actividad">
    orden?: IntFilter<"Actividad"> | number
    estado?: BoolFilter<"Actividad"> | boolean
    momentoId?: IntFilter<"Actividad"> | number
    createdAt?: DateTimeFilter<"Actividad"> | Date | string
    updatedAt?: DateTimeFilter<"Actividad"> | Date | string
    momento?: XOR<MomentoScalarRelationFilter, MomentoWhereInput>
    progresos?: ProgresoActividadListRelationFilter
  }

  export type ActividadOrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    instrucciones?: SortOrderInput | SortOrder
    contenido?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    momentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    momento?: MomentoOrderByWithRelationInput
    progresos?: ProgresoActividadOrderByRelationAggregateInput
  }

  export type ActividadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActividadWhereInput | ActividadWhereInput[]
    OR?: ActividadWhereInput[]
    NOT?: ActividadWhereInput | ActividadWhereInput[]
    tipo?: StringFilter<"Actividad"> | string
    titulo?: StringFilter<"Actividad"> | string
    instrucciones?: StringNullableFilter<"Actividad"> | string | null
    contenido?: JsonFilter<"Actividad">
    orden?: IntFilter<"Actividad"> | number
    estado?: BoolFilter<"Actividad"> | boolean
    momentoId?: IntFilter<"Actividad"> | number
    createdAt?: DateTimeFilter<"Actividad"> | Date | string
    updatedAt?: DateTimeFilter<"Actividad"> | Date | string
    momento?: XOR<MomentoScalarRelationFilter, MomentoWhereInput>
    progresos?: ProgresoActividadListRelationFilter
  }, "id">

  export type ActividadOrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    instrucciones?: SortOrderInput | SortOrder
    contenido?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    momentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActividadCountOrderByAggregateInput
    _avg?: ActividadAvgOrderByAggregateInput
    _max?: ActividadMaxOrderByAggregateInput
    _min?: ActividadMinOrderByAggregateInput
    _sum?: ActividadSumOrderByAggregateInput
  }

  export type ActividadScalarWhereWithAggregatesInput = {
    AND?: ActividadScalarWhereWithAggregatesInput | ActividadScalarWhereWithAggregatesInput[]
    OR?: ActividadScalarWhereWithAggregatesInput[]
    NOT?: ActividadScalarWhereWithAggregatesInput | ActividadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Actividad"> | number
    tipo?: StringWithAggregatesFilter<"Actividad"> | string
    titulo?: StringWithAggregatesFilter<"Actividad"> | string
    instrucciones?: StringNullableWithAggregatesFilter<"Actividad"> | string | null
    contenido?: JsonWithAggregatesFilter<"Actividad">
    orden?: IntWithAggregatesFilter<"Actividad"> | number
    estado?: BoolWithAggregatesFilter<"Actividad"> | boolean
    momentoId?: IntWithAggregatesFilter<"Actividad"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Actividad"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Actividad"> | Date | string
  }

  export type ProgresoActividadWhereInput = {
    AND?: ProgresoActividadWhereInput | ProgresoActividadWhereInput[]
    OR?: ProgresoActividadWhereInput[]
    NOT?: ProgresoActividadWhereInput | ProgresoActividadWhereInput[]
    id?: IntFilter<"ProgresoActividad"> | number
    aprendizId?: IntFilter<"ProgresoActividad"> | number
    actividadId?: IntFilter<"ProgresoActividad"> | number
    completada?: BoolFilter<"ProgresoActividad"> | boolean
    intentos?: IntFilter<"ProgresoActividad"> | number
    puntaje?: FloatNullableFilter<"ProgresoActividad"> | number | null
    respuesta?: JsonNullableFilter<"ProgresoActividad">
    completadoAt?: DateTimeNullableFilter<"ProgresoActividad"> | Date | string | null
    createdAt?: DateTimeFilter<"ProgresoActividad"> | Date | string
    updatedAt?: DateTimeFilter<"ProgresoActividad"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
    actividad?: XOR<ActividadScalarRelationFilter, ActividadWhereInput>
  }

  export type ProgresoActividadOrderByWithRelationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    completada?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrderInput | SortOrder
    respuesta?: SortOrderInput | SortOrder
    completadoAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aprendiz?: UserOrderByWithRelationInput
    actividad?: ActividadOrderByWithRelationInput
  }

  export type ProgresoActividadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    aprendizId_actividadId?: ProgresoActividadAprendizIdActividadIdCompoundUniqueInput
    AND?: ProgresoActividadWhereInput | ProgresoActividadWhereInput[]
    OR?: ProgresoActividadWhereInput[]
    NOT?: ProgresoActividadWhereInput | ProgresoActividadWhereInput[]
    aprendizId?: IntFilter<"ProgresoActividad"> | number
    actividadId?: IntFilter<"ProgresoActividad"> | number
    completada?: BoolFilter<"ProgresoActividad"> | boolean
    intentos?: IntFilter<"ProgresoActividad"> | number
    puntaje?: FloatNullableFilter<"ProgresoActividad"> | number | null
    respuesta?: JsonNullableFilter<"ProgresoActividad">
    completadoAt?: DateTimeNullableFilter<"ProgresoActividad"> | Date | string | null
    createdAt?: DateTimeFilter<"ProgresoActividad"> | Date | string
    updatedAt?: DateTimeFilter<"ProgresoActividad"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
    actividad?: XOR<ActividadScalarRelationFilter, ActividadWhereInput>
  }, "id" | "aprendizId_actividadId">

  export type ProgresoActividadOrderByWithAggregationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    completada?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrderInput | SortOrder
    respuesta?: SortOrderInput | SortOrder
    completadoAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgresoActividadCountOrderByAggregateInput
    _avg?: ProgresoActividadAvgOrderByAggregateInput
    _max?: ProgresoActividadMaxOrderByAggregateInput
    _min?: ProgresoActividadMinOrderByAggregateInput
    _sum?: ProgresoActividadSumOrderByAggregateInput
  }

  export type ProgresoActividadScalarWhereWithAggregatesInput = {
    AND?: ProgresoActividadScalarWhereWithAggregatesInput | ProgresoActividadScalarWhereWithAggregatesInput[]
    OR?: ProgresoActividadScalarWhereWithAggregatesInput[]
    NOT?: ProgresoActividadScalarWhereWithAggregatesInput | ProgresoActividadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProgresoActividad"> | number
    aprendizId?: IntWithAggregatesFilter<"ProgresoActividad"> | number
    actividadId?: IntWithAggregatesFilter<"ProgresoActividad"> | number
    completada?: BoolWithAggregatesFilter<"ProgresoActividad"> | boolean
    intentos?: IntWithAggregatesFilter<"ProgresoActividad"> | number
    puntaje?: FloatNullableWithAggregatesFilter<"ProgresoActividad"> | number | null
    respuesta?: JsonNullableWithAggregatesFilter<"ProgresoActividad">
    completadoAt?: DateTimeNullableWithAggregatesFilter<"ProgresoActividad"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProgresoActividad"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProgresoActividad"> | Date | string
  }

  export type InsigniaAprendizWhereInput = {
    AND?: InsigniaAprendizWhereInput | InsigniaAprendizWhereInput[]
    OR?: InsigniaAprendizWhereInput[]
    NOT?: InsigniaAprendizWhereInput | InsigniaAprendizWhereInput[]
    id?: IntFilter<"InsigniaAprendiz"> | number
    aprendizId?: IntFilter<"InsigniaAprendiz"> | number
    cursoId?: IntFilter<"InsigniaAprendiz"> | number
    moduloId?: IntNullableFilter<"InsigniaAprendiz"> | number | null
    tipo?: StringFilter<"InsigniaAprendiz"> | string
    nombre?: StringFilter<"InsigniaAprendiz"> | string
    descripcion?: StringNullableFilter<"InsigniaAprendiz"> | string | null
    emoji?: StringNullableFilter<"InsigniaAprendiz"> | string | null
    otorgadaAt?: DateTimeFilter<"InsigniaAprendiz"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type InsigniaAprendizOrderByWithRelationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrderInput | SortOrder
    tipo?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    otorgadaAt?: SortOrder
    aprendiz?: UserOrderByWithRelationInput
  }

  export type InsigniaAprendizWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InsigniaAprendizWhereInput | InsigniaAprendizWhereInput[]
    OR?: InsigniaAprendizWhereInput[]
    NOT?: InsigniaAprendizWhereInput | InsigniaAprendizWhereInput[]
    aprendizId?: IntFilter<"InsigniaAprendiz"> | number
    cursoId?: IntFilter<"InsigniaAprendiz"> | number
    moduloId?: IntNullableFilter<"InsigniaAprendiz"> | number | null
    tipo?: StringFilter<"InsigniaAprendiz"> | string
    nombre?: StringFilter<"InsigniaAprendiz"> | string
    descripcion?: StringNullableFilter<"InsigniaAprendiz"> | string | null
    emoji?: StringNullableFilter<"InsigniaAprendiz"> | string | null
    otorgadaAt?: DateTimeFilter<"InsigniaAprendiz"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type InsigniaAprendizOrderByWithAggregationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrderInput | SortOrder
    tipo?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    otorgadaAt?: SortOrder
    _count?: InsigniaAprendizCountOrderByAggregateInput
    _avg?: InsigniaAprendizAvgOrderByAggregateInput
    _max?: InsigniaAprendizMaxOrderByAggregateInput
    _min?: InsigniaAprendizMinOrderByAggregateInput
    _sum?: InsigniaAprendizSumOrderByAggregateInput
  }

  export type InsigniaAprendizScalarWhereWithAggregatesInput = {
    AND?: InsigniaAprendizScalarWhereWithAggregatesInput | InsigniaAprendizScalarWhereWithAggregatesInput[]
    OR?: InsigniaAprendizScalarWhereWithAggregatesInput[]
    NOT?: InsigniaAprendizScalarWhereWithAggregatesInput | InsigniaAprendizScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InsigniaAprendiz"> | number
    aprendizId?: IntWithAggregatesFilter<"InsigniaAprendiz"> | number
    cursoId?: IntWithAggregatesFilter<"InsigniaAprendiz"> | number
    moduloId?: IntNullableWithAggregatesFilter<"InsigniaAprendiz"> | number | null
    tipo?: StringWithAggregatesFilter<"InsigniaAprendiz"> | string
    nombre?: StringWithAggregatesFilter<"InsigniaAprendiz"> | string
    descripcion?: StringNullableWithAggregatesFilter<"InsigniaAprendiz"> | string | null
    emoji?: StringNullableWithAggregatesFilter<"InsigniaAprendiz"> | string | null
    otorgadaAt?: DateTimeWithAggregatesFilter<"InsigniaAprendiz"> | Date | string
  }

  export type TestResultadoWhereInput = {
    AND?: TestResultadoWhereInput | TestResultadoWhereInput[]
    OR?: TestResultadoWhereInput[]
    NOT?: TestResultadoWhereInput | TestResultadoWhereInput[]
    id?: IntFilter<"TestResultado"> | number
    aprendizId?: IntFilter<"TestResultado"> | number
    cursoId?: IntFilter<"TestResultado"> | number
    tipo?: StringFilter<"TestResultado"> | string
    puntaje?: FloatFilter<"TestResultado"> | number
    total?: IntFilter<"TestResultado"> | number
    correctas?: IntFilter<"TestResultado"> | number
    respuestas?: JsonFilter<"TestResultado">
    completadoAt?: DateTimeFilter<"TestResultado"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TestResultadoOrderByWithRelationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    tipo?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
    respuestas?: SortOrder
    completadoAt?: SortOrder
    aprendiz?: UserOrderByWithRelationInput
  }

  export type TestResultadoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TestResultadoWhereInput | TestResultadoWhereInput[]
    OR?: TestResultadoWhereInput[]
    NOT?: TestResultadoWhereInput | TestResultadoWhereInput[]
    aprendizId?: IntFilter<"TestResultado"> | number
    cursoId?: IntFilter<"TestResultado"> | number
    tipo?: StringFilter<"TestResultado"> | string
    puntaje?: FloatFilter<"TestResultado"> | number
    total?: IntFilter<"TestResultado"> | number
    correctas?: IntFilter<"TestResultado"> | number
    respuestas?: JsonFilter<"TestResultado">
    completadoAt?: DateTimeFilter<"TestResultado"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TestResultadoOrderByWithAggregationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    tipo?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
    respuestas?: SortOrder
    completadoAt?: SortOrder
    _count?: TestResultadoCountOrderByAggregateInput
    _avg?: TestResultadoAvgOrderByAggregateInput
    _max?: TestResultadoMaxOrderByAggregateInput
    _min?: TestResultadoMinOrderByAggregateInput
    _sum?: TestResultadoSumOrderByAggregateInput
  }

  export type TestResultadoScalarWhereWithAggregatesInput = {
    AND?: TestResultadoScalarWhereWithAggregatesInput | TestResultadoScalarWhereWithAggregatesInput[]
    OR?: TestResultadoScalarWhereWithAggregatesInput[]
    NOT?: TestResultadoScalarWhereWithAggregatesInput | TestResultadoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TestResultado"> | number
    aprendizId?: IntWithAggregatesFilter<"TestResultado"> | number
    cursoId?: IntWithAggregatesFilter<"TestResultado"> | number
    tipo?: StringWithAggregatesFilter<"TestResultado"> | string
    puntaje?: FloatWithAggregatesFilter<"TestResultado"> | number
    total?: IntWithAggregatesFilter<"TestResultado"> | number
    correctas?: IntWithAggregatesFilter<"TestResultado"> | number
    respuestas?: JsonWithAggregatesFilter<"TestResultado">
    completadoAt?: DateTimeWithAggregatesFilter<"TestResultado"> | Date | string
  }

  export type InscripcionWhereInput = {
    AND?: InscripcionWhereInput | InscripcionWhereInput[]
    OR?: InscripcionWhereInput[]
    NOT?: InscripcionWhereInput | InscripcionWhereInput[]
    id?: IntFilter<"Inscripcion"> | number
    aprendizId?: IntFilter<"Inscripcion"> | number
    cursoId?: IntFilter<"Inscripcion"> | number
    progreso?: FloatFilter<"Inscripcion"> | number
    estado?: StringFilter<"Inscripcion"> | string
    createdAt?: DateTimeFilter<"Inscripcion"> | Date | string
    updatedAt?: DateTimeFilter<"Inscripcion"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
  }

  export type InscripcionOrderByWithRelationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aprendiz?: UserOrderByWithRelationInput
    curso?: CursoOrderByWithRelationInput
  }

  export type InscripcionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    aprendizId_cursoId?: InscripcionAprendizIdCursoIdCompoundUniqueInput
    AND?: InscripcionWhereInput | InscripcionWhereInput[]
    OR?: InscripcionWhereInput[]
    NOT?: InscripcionWhereInput | InscripcionWhereInput[]
    aprendizId?: IntFilter<"Inscripcion"> | number
    cursoId?: IntFilter<"Inscripcion"> | number
    progreso?: FloatFilter<"Inscripcion"> | number
    estado?: StringFilter<"Inscripcion"> | string
    createdAt?: DateTimeFilter<"Inscripcion"> | Date | string
    updatedAt?: DateTimeFilter<"Inscripcion"> | Date | string
    aprendiz?: XOR<UserScalarRelationFilter, UserWhereInput>
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
  }, "id" | "aprendizId_cursoId">

  export type InscripcionOrderByWithAggregationInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InscripcionCountOrderByAggregateInput
    _avg?: InscripcionAvgOrderByAggregateInput
    _max?: InscripcionMaxOrderByAggregateInput
    _min?: InscripcionMinOrderByAggregateInput
    _sum?: InscripcionSumOrderByAggregateInput
  }

  export type InscripcionScalarWhereWithAggregatesInput = {
    AND?: InscripcionScalarWhereWithAggregatesInput | InscripcionScalarWhereWithAggregatesInput[]
    OR?: InscripcionScalarWhereWithAggregatesInput[]
    NOT?: InscripcionScalarWhereWithAggregatesInput | InscripcionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Inscripcion"> | number
    aprendizId?: IntWithAggregatesFilter<"Inscripcion"> | number
    cursoId?: IntWithAggregatesFilter<"Inscripcion"> | number
    progreso?: FloatWithAggregatesFilter<"Inscripcion"> | number
    estado?: StringWithAggregatesFilter<"Inscripcion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Inscripcion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Inscripcion"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    accion?: StringFilter<"AuditLog"> | string
    recurso?: StringFilter<"AuditLog"> | string
    recursoId?: IntNullableFilter<"AuditLog"> | number | null
    detalle?: StringNullableFilter<"AuditLog"> | string | null
    usuarioId?: IntNullableFilter<"AuditLog"> | number | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    usuario?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    accion?: SortOrder
    recurso?: SortOrder
    recursoId?: SortOrderInput | SortOrder
    detalle?: SortOrderInput | SortOrder
    usuarioId?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    usuario?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    accion?: StringFilter<"AuditLog"> | string
    recurso?: StringFilter<"AuditLog"> | string
    recursoId?: IntNullableFilter<"AuditLog"> | number | null
    detalle?: StringNullableFilter<"AuditLog"> | string | null
    usuarioId?: IntNullableFilter<"AuditLog"> | number | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    usuario?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    accion?: SortOrder
    recurso?: SortOrder
    recursoId?: SortOrderInput | SortOrder
    detalle?: SortOrderInput | SortOrder
    usuarioId?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    accion?: StringWithAggregatesFilter<"AuditLog"> | string
    recurso?: StringWithAggregatesFilter<"AuditLog"> | string
    recursoId?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    detalle?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    usuarioId?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    ip?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type NotificacionWhereInput = {
    AND?: NotificacionWhereInput | NotificacionWhereInput[]
    OR?: NotificacionWhereInput[]
    NOT?: NotificacionWhereInput | NotificacionWhereInput[]
    id?: IntFilter<"Notificacion"> | number
    tipo?: StringFilter<"Notificacion"> | string
    asunto?: StringFilter<"Notificacion"> | string
    mensaje?: StringFilter<"Notificacion"> | string
    destinatarioId?: IntFilter<"Notificacion"> | number
    leida?: BoolFilter<"Notificacion"> | boolean
    enviadoPorEmail?: BoolFilter<"Notificacion"> | boolean
    createdAt?: DateTimeFilter<"Notificacion"> | Date | string
    destinatario?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificacionOrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    asunto?: SortOrder
    mensaje?: SortOrder
    destinatarioId?: SortOrder
    leida?: SortOrder
    enviadoPorEmail?: SortOrder
    createdAt?: SortOrder
    destinatario?: UserOrderByWithRelationInput
  }

  export type NotificacionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificacionWhereInput | NotificacionWhereInput[]
    OR?: NotificacionWhereInput[]
    NOT?: NotificacionWhereInput | NotificacionWhereInput[]
    tipo?: StringFilter<"Notificacion"> | string
    asunto?: StringFilter<"Notificacion"> | string
    mensaje?: StringFilter<"Notificacion"> | string
    destinatarioId?: IntFilter<"Notificacion"> | number
    leida?: BoolFilter<"Notificacion"> | boolean
    enviadoPorEmail?: BoolFilter<"Notificacion"> | boolean
    createdAt?: DateTimeFilter<"Notificacion"> | Date | string
    destinatario?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificacionOrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    asunto?: SortOrder
    mensaje?: SortOrder
    destinatarioId?: SortOrder
    leida?: SortOrder
    enviadoPorEmail?: SortOrder
    createdAt?: SortOrder
    _count?: NotificacionCountOrderByAggregateInput
    _avg?: NotificacionAvgOrderByAggregateInput
    _max?: NotificacionMaxOrderByAggregateInput
    _min?: NotificacionMinOrderByAggregateInput
    _sum?: NotificacionSumOrderByAggregateInput
  }

  export type NotificacionScalarWhereWithAggregatesInput = {
    AND?: NotificacionScalarWhereWithAggregatesInput | NotificacionScalarWhereWithAggregatesInput[]
    OR?: NotificacionScalarWhereWithAggregatesInput[]
    NOT?: NotificacionScalarWhereWithAggregatesInput | NotificacionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notificacion"> | number
    tipo?: StringWithAggregatesFilter<"Notificacion"> | string
    asunto?: StringWithAggregatesFilter<"Notificacion"> | string
    mensaje?: StringWithAggregatesFilter<"Notificacion"> | string
    destinatarioId?: IntWithAggregatesFilter<"Notificacion"> | number
    leida?: BoolWithAggregatesFilter<"Notificacion"> | boolean
    enviadoPorEmail?: BoolWithAggregatesFilter<"Notificacion"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notificacion"> | Date | string
  }

  export type UserCreateInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserUpdateInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CursoCreateInput = {
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instructor: UserCreateNestedOneWithoutCursosComoInstructorInput
    modulos?: ModuloCreateNestedManyWithoutCursoInput
    inscripciones?: InscripcionCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    instructorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    modulos?: ModuloUncheckedCreateNestedManyWithoutCursoInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instructor?: UserUpdateOneRequiredWithoutCursosComoInstructorNestedInput
    modulos?: ModuloUpdateManyWithoutCursoNestedInput
    inscripciones?: InscripcionUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    instructorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulos?: ModuloUncheckedUpdateManyWithoutCursoNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type CursoCreateManyInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    instructorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CursoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CursoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    instructorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloCreateInput = {
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    curso: CursoCreateNestedOneWithoutModulosInput
    momentos?: MomentoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    cursoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    momentos?: MomentoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutModulosNestedInput
    momentos?: MomentoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    cursoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    momentos?: MomentoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type ModuloCreateManyInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    cursoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    cursoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomentoCreateInput = {
    nombre: string
    tipo: string
    orden?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutMomentosInput
    actividades?: ActividadCreateNestedManyWithoutMomentoInput
  }

  export type MomentoUncheckedCreateInput = {
    id?: number
    nombre: string
    tipo: string
    orden?: number
    moduloId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    actividades?: ActividadUncheckedCreateNestedManyWithoutMomentoInput
  }

  export type MomentoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutMomentosNestedInput
    actividades?: ActividadUpdateManyWithoutMomentoNestedInput
  }

  export type MomentoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    moduloId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actividades?: ActividadUncheckedUpdateManyWithoutMomentoNestedInput
  }

  export type MomentoCreateManyInput = {
    id?: number
    nombre: string
    tipo: string
    orden?: number
    moduloId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomentoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomentoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    moduloId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActividadCreateInput = {
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    momento: MomentoCreateNestedOneWithoutActividadesInput
    progresos?: ProgresoActividadCreateNestedManyWithoutActividadInput
  }

  export type ActividadUncheckedCreateInput = {
    id?: number
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    momentoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    progresos?: ProgresoActividadUncheckedCreateNestedManyWithoutActividadInput
  }

  export type ActividadUpdateInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    momento?: MomentoUpdateOneRequiredWithoutActividadesNestedInput
    progresos?: ProgresoActividadUpdateManyWithoutActividadNestedInput
  }

  export type ActividadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    momentoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progresos?: ProgresoActividadUncheckedUpdateManyWithoutActividadNestedInput
  }

  export type ActividadCreateManyInput = {
    id?: number
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    momentoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActividadUpdateManyMutationInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActividadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    momentoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadCreateInput = {
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aprendiz: UserCreateNestedOneWithoutProgresoActividadesInput
    actividad: ActividadCreateNestedOneWithoutProgresosInput
  }

  export type ProgresoActividadUncheckedCreateInput = {
    id?: number
    aprendizId: number
    actividadId: number
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgresoActividadUpdateInput = {
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aprendiz?: UserUpdateOneRequiredWithoutProgresoActividadesNestedInput
    actividad?: ActividadUpdateOneRequiredWithoutProgresosNestedInput
  }

  export type ProgresoActividadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    actividadId?: IntFieldUpdateOperationsInput | number
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadCreateManyInput = {
    id?: number
    aprendizId: number
    actividadId: number
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgresoActividadUpdateManyMutationInput = {
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    actividadId?: IntFieldUpdateOperationsInput | number
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsigniaAprendizCreateInput = {
    cursoId: number
    moduloId?: number | null
    tipo: string
    nombre: string
    descripcion?: string | null
    emoji?: string | null
    otorgadaAt?: Date | string
    aprendiz: UserCreateNestedOneWithoutInsigniasInput
  }

  export type InsigniaAprendizUncheckedCreateInput = {
    id?: number
    aprendizId: number
    cursoId: number
    moduloId?: number | null
    tipo: string
    nombre: string
    descripcion?: string | null
    emoji?: string | null
    otorgadaAt?: Date | string
  }

  export type InsigniaAprendizUpdateInput = {
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aprendiz?: UserUpdateOneRequiredWithoutInsigniasNestedInput
  }

  export type InsigniaAprendizUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsigniaAprendizCreateManyInput = {
    id?: number
    aprendizId: number
    cursoId: number
    moduloId?: number | null
    tipo: string
    nombre: string
    descripcion?: string | null
    emoji?: string | null
    otorgadaAt?: Date | string
  }

  export type InsigniaAprendizUpdateManyMutationInput = {
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsigniaAprendizUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultadoCreateInput = {
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonNullValueInput | InputJsonValue
    completadoAt?: Date | string
    aprendiz: UserCreateNestedOneWithoutTestResultadosInput
  }

  export type TestResultadoUncheckedCreateInput = {
    id?: number
    aprendizId: number
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonNullValueInput | InputJsonValue
    completadoAt?: Date | string
  }

  export type TestResultadoUpdateInput = {
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aprendiz?: UserUpdateOneRequiredWithoutTestResultadosNestedInput
  }

  export type TestResultadoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultadoCreateManyInput = {
    id?: number
    aprendizId: number
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonNullValueInput | InputJsonValue
    completadoAt?: Date | string
  }

  export type TestResultadoUpdateManyMutationInput = {
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultadoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionCreateInput = {
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aprendiz: UserCreateNestedOneWithoutInscripcionesInput
    curso: CursoCreateNestedOneWithoutInscripcionesInput
  }

  export type InscripcionUncheckedCreateInput = {
    id?: number
    aprendizId: number
    cursoId: number
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscripcionUpdateInput = {
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aprendiz?: UserUpdateOneRequiredWithoutInscripcionesNestedInput
    curso?: CursoUpdateOneRequiredWithoutInscripcionesNestedInput
  }

  export type InscripcionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionCreateManyInput = {
    id?: number
    aprendizId: number
    cursoId: number
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscripcionUpdateManyMutationInput = {
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    accion: string
    recurso: string
    recursoId?: number | null
    detalle?: string | null
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    usuario?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    accion: string
    recurso: string
    recursoId?: number | null
    detalle?: string | null
    usuarioId?: number | null
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    accion: string
    recurso: string
    recursoId?: number | null
    detalle?: string | null
    usuarioId?: number | null
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionCreateInput = {
    tipo: string
    asunto: string
    mensaje: string
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: Date | string
    destinatario: UserCreateNestedOneWithoutNotificacionesInput
  }

  export type NotificacionUncheckedCreateInput = {
    id?: number
    tipo: string
    asunto: string
    mensaje: string
    destinatarioId: number
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: Date | string
  }

  export type NotificacionUpdateInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destinatario?: UserUpdateOneRequiredWithoutNotificacionesNestedInput
  }

  export type NotificacionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    destinatarioId?: IntFieldUpdateOperationsInput | number
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionCreateManyInput = {
    id?: number
    tipo: string
    asunto: string
    mensaje: string
    destinatarioId: number
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: Date | string
  }

  export type NotificacionUpdateManyMutationInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    destinatarioId?: IntFieldUpdateOperationsInput | number
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CursoListRelationFilter = {
    every?: CursoWhereInput
    some?: CursoWhereInput
    none?: CursoWhereInput
  }

  export type InscripcionListRelationFilter = {
    every?: InscripcionWhereInput
    some?: InscripcionWhereInput
    none?: InscripcionWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type NotificacionListRelationFilter = {
    every?: NotificacionWhereInput
    some?: NotificacionWhereInput
    none?: NotificacionWhereInput
  }

  export type ProgresoActividadListRelationFilter = {
    every?: ProgresoActividadWhereInput
    some?: ProgresoActividadWhereInput
    none?: ProgresoActividadWhereInput
  }

  export type InsigniaAprendizListRelationFilter = {
    every?: InsigniaAprendizWhereInput
    some?: InsigniaAprendizWhereInput
    none?: InsigniaAprendizWhereInput
  }

  export type TestResultadoListRelationFilter = {
    every?: TestResultadoWhereInput
    some?: TestResultadoWhereInput
    none?: TestResultadoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CursoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InscripcionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificacionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgresoActividadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InsigniaAprendizOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestResultadoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    correo_usuario?: SortOrder
    passw_usuario?: SortOrder
    nombre_usuario?: SortOrder
    estado_usuario?: SortOrder
    rol_usuario?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    correo_usuario?: SortOrder
    passw_usuario?: SortOrder
    nombre_usuario?: SortOrder
    estado_usuario?: SortOrder
    rol_usuario?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    correo_usuario?: SortOrder
    passw_usuario?: SortOrder
    nombre_usuario?: SortOrder
    estado_usuario?: SortOrder
    rol_usuario?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ModuloListRelationFilter = {
    every?: ModuloWhereInput
    some?: ModuloWhereInput
    none?: ModuloWhereInput
  }

  export type ModuloOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CursoCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    nivel?: SortOrder
    estado?: SortOrder
    instructorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CursoAvgOrderByAggregateInput = {
    id?: SortOrder
    instructorId?: SortOrder
  }

  export type CursoMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    nivel?: SortOrder
    estado?: SortOrder
    instructorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CursoMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    nivel?: SortOrder
    estado?: SortOrder
    instructorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CursoSumOrderByAggregateInput = {
    id?: SortOrder
    instructorId?: SortOrder
  }

  export type CursoScalarRelationFilter = {
    is?: CursoWhereInput
    isNot?: CursoWhereInput
  }

  export type MomentoListRelationFilter = {
    every?: MomentoWhereInput
    some?: MomentoWhereInput
    none?: MomentoWhereInput
  }

  export type MomentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModuloCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    contenido?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    cursoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloAvgOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
    cursoId?: SortOrder
  }

  export type ModuloMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    contenido?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    cursoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    contenido?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    cursoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloSumOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
    cursoId?: SortOrder
  }

  export type ModuloScalarRelationFilter = {
    is?: ModuloWhereInput
    isNot?: ModuloWhereInput
  }

  export type ActividadListRelationFilter = {
    every?: ActividadWhereInput
    some?: ActividadWhereInput
    none?: ActividadWhereInput
  }

  export type ActividadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MomentoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MomentoAvgOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
  }

  export type MomentoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MomentoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MomentoSumOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
    moduloId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MomentoScalarRelationFilter = {
    is?: MomentoWhereInput
    isNot?: MomentoWhereInput
  }

  export type ActividadCountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    instrucciones?: SortOrder
    contenido?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    momentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActividadAvgOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
    momentoId?: SortOrder
  }

  export type ActividadMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    instrucciones?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    momentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActividadMinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    instrucciones?: SortOrder
    orden?: SortOrder
    estado?: SortOrder
    momentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActividadSumOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
    momentoId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ActividadScalarRelationFilter = {
    is?: ActividadWhereInput
    isNot?: ActividadWhereInput
  }

  export type ProgresoActividadAprendizIdActividadIdCompoundUniqueInput = {
    aprendizId: number
    actividadId: number
  }

  export type ProgresoActividadCountOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    completada?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrder
    respuesta?: SortOrder
    completadoAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgresoActividadAvgOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrder
  }

  export type ProgresoActividadMaxOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    completada?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrder
    completadoAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgresoActividadMinOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    completada?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrder
    completadoAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgresoActividadSumOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    actividadId?: SortOrder
    intentos?: SortOrder
    puntaje?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type InsigniaAprendizCountOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrder
    tipo?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    emoji?: SortOrder
    otorgadaAt?: SortOrder
  }

  export type InsigniaAprendizAvgOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrder
  }

  export type InsigniaAprendizMaxOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrder
    tipo?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    emoji?: SortOrder
    otorgadaAt?: SortOrder
  }

  export type InsigniaAprendizMinOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrder
    tipo?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    emoji?: SortOrder
    otorgadaAt?: SortOrder
  }

  export type InsigniaAprendizSumOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    moduloId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TestResultadoCountOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    tipo?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
    respuestas?: SortOrder
    completadoAt?: SortOrder
  }

  export type TestResultadoAvgOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
  }

  export type TestResultadoMaxOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    tipo?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
    completadoAt?: SortOrder
  }

  export type TestResultadoMinOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    tipo?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
    completadoAt?: SortOrder
  }

  export type TestResultadoSumOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    puntaje?: SortOrder
    total?: SortOrder
    correctas?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type InscripcionAprendizIdCursoIdCompoundUniqueInput = {
    aprendizId: number
    cursoId: number
  }

  export type InscripcionCountOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscripcionAvgOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
  }

  export type InscripcionMaxOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscripcionMinOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscripcionSumOrderByAggregateInput = {
    id?: SortOrder
    aprendizId?: SortOrder
    cursoId?: SortOrder
    progreso?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    accion?: SortOrder
    recurso?: SortOrder
    recursoId?: SortOrder
    detalle?: SortOrder
    usuarioId?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    recursoId?: SortOrder
    usuarioId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    accion?: SortOrder
    recurso?: SortOrder
    recursoId?: SortOrder
    detalle?: SortOrder
    usuarioId?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    accion?: SortOrder
    recurso?: SortOrder
    recursoId?: SortOrder
    detalle?: SortOrder
    usuarioId?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    recursoId?: SortOrder
    usuarioId?: SortOrder
  }

  export type NotificacionCountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    asunto?: SortOrder
    mensaje?: SortOrder
    destinatarioId?: SortOrder
    leida?: SortOrder
    enviadoPorEmail?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificacionAvgOrderByAggregateInput = {
    id?: SortOrder
    destinatarioId?: SortOrder
  }

  export type NotificacionMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    asunto?: SortOrder
    mensaje?: SortOrder
    destinatarioId?: SortOrder
    leida?: SortOrder
    enviadoPorEmail?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificacionMinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    asunto?: SortOrder
    mensaje?: SortOrder
    destinatarioId?: SortOrder
    leida?: SortOrder
    enviadoPorEmail?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificacionSumOrderByAggregateInput = {
    id?: SortOrder
    destinatarioId?: SortOrder
  }

  export type CursoCreateNestedManyWithoutInstructorInput = {
    create?: XOR<CursoCreateWithoutInstructorInput, CursoUncheckedCreateWithoutInstructorInput> | CursoCreateWithoutInstructorInput[] | CursoUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutInstructorInput | CursoCreateOrConnectWithoutInstructorInput[]
    createMany?: CursoCreateManyInstructorInputEnvelope
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
  }

  export type InscripcionCreateNestedManyWithoutAprendizInput = {
    create?: XOR<InscripcionCreateWithoutAprendizInput, InscripcionUncheckedCreateWithoutAprendizInput> | InscripcionCreateWithoutAprendizInput[] | InscripcionUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutAprendizInput | InscripcionCreateOrConnectWithoutAprendizInput[]
    createMany?: InscripcionCreateManyAprendizInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<AuditLogCreateWithoutUsuarioInput, AuditLogUncheckedCreateWithoutUsuarioInput> | AuditLogCreateWithoutUsuarioInput[] | AuditLogUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUsuarioInput | AuditLogCreateOrConnectWithoutUsuarioInput[]
    createMany?: AuditLogCreateManyUsuarioInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NotificacionCreateNestedManyWithoutDestinatarioInput = {
    create?: XOR<NotificacionCreateWithoutDestinatarioInput, NotificacionUncheckedCreateWithoutDestinatarioInput> | NotificacionCreateWithoutDestinatarioInput[] | NotificacionUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutDestinatarioInput | NotificacionCreateOrConnectWithoutDestinatarioInput[]
    createMany?: NotificacionCreateManyDestinatarioInputEnvelope
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
  }

  export type ProgresoActividadCreateNestedManyWithoutAprendizInput = {
    create?: XOR<ProgresoActividadCreateWithoutAprendizInput, ProgresoActividadUncheckedCreateWithoutAprendizInput> | ProgresoActividadCreateWithoutAprendizInput[] | ProgresoActividadUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutAprendizInput | ProgresoActividadCreateOrConnectWithoutAprendizInput[]
    createMany?: ProgresoActividadCreateManyAprendizInputEnvelope
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
  }

  export type InsigniaAprendizCreateNestedManyWithoutAprendizInput = {
    create?: XOR<InsigniaAprendizCreateWithoutAprendizInput, InsigniaAprendizUncheckedCreateWithoutAprendizInput> | InsigniaAprendizCreateWithoutAprendizInput[] | InsigniaAprendizUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InsigniaAprendizCreateOrConnectWithoutAprendizInput | InsigniaAprendizCreateOrConnectWithoutAprendizInput[]
    createMany?: InsigniaAprendizCreateManyAprendizInputEnvelope
    connect?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
  }

  export type TestResultadoCreateNestedManyWithoutAprendizInput = {
    create?: XOR<TestResultadoCreateWithoutAprendizInput, TestResultadoUncheckedCreateWithoutAprendizInput> | TestResultadoCreateWithoutAprendizInput[] | TestResultadoUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: TestResultadoCreateOrConnectWithoutAprendizInput | TestResultadoCreateOrConnectWithoutAprendizInput[]
    createMany?: TestResultadoCreateManyAprendizInputEnvelope
    connect?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
  }

  export type CursoUncheckedCreateNestedManyWithoutInstructorInput = {
    create?: XOR<CursoCreateWithoutInstructorInput, CursoUncheckedCreateWithoutInstructorInput> | CursoCreateWithoutInstructorInput[] | CursoUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutInstructorInput | CursoCreateOrConnectWithoutInstructorInput[]
    createMany?: CursoCreateManyInstructorInputEnvelope
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
  }

  export type InscripcionUncheckedCreateNestedManyWithoutAprendizInput = {
    create?: XOR<InscripcionCreateWithoutAprendizInput, InscripcionUncheckedCreateWithoutAprendizInput> | InscripcionCreateWithoutAprendizInput[] | InscripcionUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutAprendizInput | InscripcionCreateOrConnectWithoutAprendizInput[]
    createMany?: InscripcionCreateManyAprendizInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<AuditLogCreateWithoutUsuarioInput, AuditLogUncheckedCreateWithoutUsuarioInput> | AuditLogCreateWithoutUsuarioInput[] | AuditLogUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUsuarioInput | AuditLogCreateOrConnectWithoutUsuarioInput[]
    createMany?: AuditLogCreateManyUsuarioInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput = {
    create?: XOR<NotificacionCreateWithoutDestinatarioInput, NotificacionUncheckedCreateWithoutDestinatarioInput> | NotificacionCreateWithoutDestinatarioInput[] | NotificacionUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutDestinatarioInput | NotificacionCreateOrConnectWithoutDestinatarioInput[]
    createMany?: NotificacionCreateManyDestinatarioInputEnvelope
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
  }

  export type ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput = {
    create?: XOR<ProgresoActividadCreateWithoutAprendizInput, ProgresoActividadUncheckedCreateWithoutAprendizInput> | ProgresoActividadCreateWithoutAprendizInput[] | ProgresoActividadUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutAprendizInput | ProgresoActividadCreateOrConnectWithoutAprendizInput[]
    createMany?: ProgresoActividadCreateManyAprendizInputEnvelope
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
  }

  export type InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput = {
    create?: XOR<InsigniaAprendizCreateWithoutAprendizInput, InsigniaAprendizUncheckedCreateWithoutAprendizInput> | InsigniaAprendizCreateWithoutAprendizInput[] | InsigniaAprendizUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InsigniaAprendizCreateOrConnectWithoutAprendizInput | InsigniaAprendizCreateOrConnectWithoutAprendizInput[]
    createMany?: InsigniaAprendizCreateManyAprendizInputEnvelope
    connect?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
  }

  export type TestResultadoUncheckedCreateNestedManyWithoutAprendizInput = {
    create?: XOR<TestResultadoCreateWithoutAprendizInput, TestResultadoUncheckedCreateWithoutAprendizInput> | TestResultadoCreateWithoutAprendizInput[] | TestResultadoUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: TestResultadoCreateOrConnectWithoutAprendizInput | TestResultadoCreateOrConnectWithoutAprendizInput[]
    createMany?: TestResultadoCreateManyAprendizInputEnvelope
    connect?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CursoUpdateManyWithoutInstructorNestedInput = {
    create?: XOR<CursoCreateWithoutInstructorInput, CursoUncheckedCreateWithoutInstructorInput> | CursoCreateWithoutInstructorInput[] | CursoUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutInstructorInput | CursoCreateOrConnectWithoutInstructorInput[]
    upsert?: CursoUpsertWithWhereUniqueWithoutInstructorInput | CursoUpsertWithWhereUniqueWithoutInstructorInput[]
    createMany?: CursoCreateManyInstructorInputEnvelope
    set?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    disconnect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    delete?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    update?: CursoUpdateWithWhereUniqueWithoutInstructorInput | CursoUpdateWithWhereUniqueWithoutInstructorInput[]
    updateMany?: CursoUpdateManyWithWhereWithoutInstructorInput | CursoUpdateManyWithWhereWithoutInstructorInput[]
    deleteMany?: CursoScalarWhereInput | CursoScalarWhereInput[]
  }

  export type InscripcionUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<InscripcionCreateWithoutAprendizInput, InscripcionUncheckedCreateWithoutAprendizInput> | InscripcionCreateWithoutAprendizInput[] | InscripcionUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutAprendizInput | InscripcionCreateOrConnectWithoutAprendizInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutAprendizInput | InscripcionUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: InscripcionCreateManyAprendizInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutAprendizInput | InscripcionUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutAprendizInput | InscripcionUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<AuditLogCreateWithoutUsuarioInput, AuditLogUncheckedCreateWithoutUsuarioInput> | AuditLogCreateWithoutUsuarioInput[] | AuditLogUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUsuarioInput | AuditLogCreateOrConnectWithoutUsuarioInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUsuarioInput | AuditLogUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: AuditLogCreateManyUsuarioInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUsuarioInput | AuditLogUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUsuarioInput | AuditLogUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NotificacionUpdateManyWithoutDestinatarioNestedInput = {
    create?: XOR<NotificacionCreateWithoutDestinatarioInput, NotificacionUncheckedCreateWithoutDestinatarioInput> | NotificacionCreateWithoutDestinatarioInput[] | NotificacionUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutDestinatarioInput | NotificacionCreateOrConnectWithoutDestinatarioInput[]
    upsert?: NotificacionUpsertWithWhereUniqueWithoutDestinatarioInput | NotificacionUpsertWithWhereUniqueWithoutDestinatarioInput[]
    createMany?: NotificacionCreateManyDestinatarioInputEnvelope
    set?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    disconnect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    delete?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    update?: NotificacionUpdateWithWhereUniqueWithoutDestinatarioInput | NotificacionUpdateWithWhereUniqueWithoutDestinatarioInput[]
    updateMany?: NotificacionUpdateManyWithWhereWithoutDestinatarioInput | NotificacionUpdateManyWithWhereWithoutDestinatarioInput[]
    deleteMany?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
  }

  export type ProgresoActividadUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<ProgresoActividadCreateWithoutAprendizInput, ProgresoActividadUncheckedCreateWithoutAprendizInput> | ProgresoActividadCreateWithoutAprendizInput[] | ProgresoActividadUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutAprendizInput | ProgresoActividadCreateOrConnectWithoutAprendizInput[]
    upsert?: ProgresoActividadUpsertWithWhereUniqueWithoutAprendizInput | ProgresoActividadUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: ProgresoActividadCreateManyAprendizInputEnvelope
    set?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    disconnect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    delete?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    update?: ProgresoActividadUpdateWithWhereUniqueWithoutAprendizInput | ProgresoActividadUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: ProgresoActividadUpdateManyWithWhereWithoutAprendizInput | ProgresoActividadUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: ProgresoActividadScalarWhereInput | ProgresoActividadScalarWhereInput[]
  }

  export type InsigniaAprendizUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<InsigniaAprendizCreateWithoutAprendizInput, InsigniaAprendizUncheckedCreateWithoutAprendizInput> | InsigniaAprendizCreateWithoutAprendizInput[] | InsigniaAprendizUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InsigniaAprendizCreateOrConnectWithoutAprendizInput | InsigniaAprendizCreateOrConnectWithoutAprendizInput[]
    upsert?: InsigniaAprendizUpsertWithWhereUniqueWithoutAprendizInput | InsigniaAprendizUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: InsigniaAprendizCreateManyAprendizInputEnvelope
    set?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    disconnect?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    delete?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    connect?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    update?: InsigniaAprendizUpdateWithWhereUniqueWithoutAprendizInput | InsigniaAprendizUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: InsigniaAprendizUpdateManyWithWhereWithoutAprendizInput | InsigniaAprendizUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: InsigniaAprendizScalarWhereInput | InsigniaAprendizScalarWhereInput[]
  }

  export type TestResultadoUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<TestResultadoCreateWithoutAprendizInput, TestResultadoUncheckedCreateWithoutAprendizInput> | TestResultadoCreateWithoutAprendizInput[] | TestResultadoUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: TestResultadoCreateOrConnectWithoutAprendizInput | TestResultadoCreateOrConnectWithoutAprendizInput[]
    upsert?: TestResultadoUpsertWithWhereUniqueWithoutAprendizInput | TestResultadoUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: TestResultadoCreateManyAprendizInputEnvelope
    set?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    disconnect?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    delete?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    connect?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    update?: TestResultadoUpdateWithWhereUniqueWithoutAprendizInput | TestResultadoUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: TestResultadoUpdateManyWithWhereWithoutAprendizInput | TestResultadoUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: TestResultadoScalarWhereInput | TestResultadoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CursoUncheckedUpdateManyWithoutInstructorNestedInput = {
    create?: XOR<CursoCreateWithoutInstructorInput, CursoUncheckedCreateWithoutInstructorInput> | CursoCreateWithoutInstructorInput[] | CursoUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutInstructorInput | CursoCreateOrConnectWithoutInstructorInput[]
    upsert?: CursoUpsertWithWhereUniqueWithoutInstructorInput | CursoUpsertWithWhereUniqueWithoutInstructorInput[]
    createMany?: CursoCreateManyInstructorInputEnvelope
    set?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    disconnect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    delete?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    update?: CursoUpdateWithWhereUniqueWithoutInstructorInput | CursoUpdateWithWhereUniqueWithoutInstructorInput[]
    updateMany?: CursoUpdateManyWithWhereWithoutInstructorInput | CursoUpdateManyWithWhereWithoutInstructorInput[]
    deleteMany?: CursoScalarWhereInput | CursoScalarWhereInput[]
  }

  export type InscripcionUncheckedUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<InscripcionCreateWithoutAprendizInput, InscripcionUncheckedCreateWithoutAprendizInput> | InscripcionCreateWithoutAprendizInput[] | InscripcionUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutAprendizInput | InscripcionCreateOrConnectWithoutAprendizInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutAprendizInput | InscripcionUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: InscripcionCreateManyAprendizInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutAprendizInput | InscripcionUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutAprendizInput | InscripcionUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<AuditLogCreateWithoutUsuarioInput, AuditLogUncheckedCreateWithoutUsuarioInput> | AuditLogCreateWithoutUsuarioInput[] | AuditLogUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUsuarioInput | AuditLogCreateOrConnectWithoutUsuarioInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUsuarioInput | AuditLogUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: AuditLogCreateManyUsuarioInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUsuarioInput | AuditLogUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUsuarioInput | AuditLogUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput = {
    create?: XOR<NotificacionCreateWithoutDestinatarioInput, NotificacionUncheckedCreateWithoutDestinatarioInput> | NotificacionCreateWithoutDestinatarioInput[] | NotificacionUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: NotificacionCreateOrConnectWithoutDestinatarioInput | NotificacionCreateOrConnectWithoutDestinatarioInput[]
    upsert?: NotificacionUpsertWithWhereUniqueWithoutDestinatarioInput | NotificacionUpsertWithWhereUniqueWithoutDestinatarioInput[]
    createMany?: NotificacionCreateManyDestinatarioInputEnvelope
    set?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    disconnect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    delete?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    connect?: NotificacionWhereUniqueInput | NotificacionWhereUniqueInput[]
    update?: NotificacionUpdateWithWhereUniqueWithoutDestinatarioInput | NotificacionUpdateWithWhereUniqueWithoutDestinatarioInput[]
    updateMany?: NotificacionUpdateManyWithWhereWithoutDestinatarioInput | NotificacionUpdateManyWithWhereWithoutDestinatarioInput[]
    deleteMany?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
  }

  export type ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<ProgresoActividadCreateWithoutAprendizInput, ProgresoActividadUncheckedCreateWithoutAprendizInput> | ProgresoActividadCreateWithoutAprendizInput[] | ProgresoActividadUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutAprendizInput | ProgresoActividadCreateOrConnectWithoutAprendizInput[]
    upsert?: ProgresoActividadUpsertWithWhereUniqueWithoutAprendizInput | ProgresoActividadUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: ProgresoActividadCreateManyAprendizInputEnvelope
    set?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    disconnect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    delete?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    update?: ProgresoActividadUpdateWithWhereUniqueWithoutAprendizInput | ProgresoActividadUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: ProgresoActividadUpdateManyWithWhereWithoutAprendizInput | ProgresoActividadUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: ProgresoActividadScalarWhereInput | ProgresoActividadScalarWhereInput[]
  }

  export type InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<InsigniaAprendizCreateWithoutAprendizInput, InsigniaAprendizUncheckedCreateWithoutAprendizInput> | InsigniaAprendizCreateWithoutAprendizInput[] | InsigniaAprendizUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: InsigniaAprendizCreateOrConnectWithoutAprendizInput | InsigniaAprendizCreateOrConnectWithoutAprendizInput[]
    upsert?: InsigniaAprendizUpsertWithWhereUniqueWithoutAprendizInput | InsigniaAprendizUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: InsigniaAprendizCreateManyAprendizInputEnvelope
    set?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    disconnect?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    delete?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    connect?: InsigniaAprendizWhereUniqueInput | InsigniaAprendizWhereUniqueInput[]
    update?: InsigniaAprendizUpdateWithWhereUniqueWithoutAprendizInput | InsigniaAprendizUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: InsigniaAprendizUpdateManyWithWhereWithoutAprendizInput | InsigniaAprendizUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: InsigniaAprendizScalarWhereInput | InsigniaAprendizScalarWhereInput[]
  }

  export type TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput = {
    create?: XOR<TestResultadoCreateWithoutAprendizInput, TestResultadoUncheckedCreateWithoutAprendizInput> | TestResultadoCreateWithoutAprendizInput[] | TestResultadoUncheckedCreateWithoutAprendizInput[]
    connectOrCreate?: TestResultadoCreateOrConnectWithoutAprendizInput | TestResultadoCreateOrConnectWithoutAprendizInput[]
    upsert?: TestResultadoUpsertWithWhereUniqueWithoutAprendizInput | TestResultadoUpsertWithWhereUniqueWithoutAprendizInput[]
    createMany?: TestResultadoCreateManyAprendizInputEnvelope
    set?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    disconnect?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    delete?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    connect?: TestResultadoWhereUniqueInput | TestResultadoWhereUniqueInput[]
    update?: TestResultadoUpdateWithWhereUniqueWithoutAprendizInput | TestResultadoUpdateWithWhereUniqueWithoutAprendizInput[]
    updateMany?: TestResultadoUpdateManyWithWhereWithoutAprendizInput | TestResultadoUpdateManyWithWhereWithoutAprendizInput[]
    deleteMany?: TestResultadoScalarWhereInput | TestResultadoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCursosComoInstructorInput = {
    create?: XOR<UserCreateWithoutCursosComoInstructorInput, UserUncheckedCreateWithoutCursosComoInstructorInput>
    connectOrCreate?: UserCreateOrConnectWithoutCursosComoInstructorInput
    connect?: UserWhereUniqueInput
  }

  export type ModuloCreateNestedManyWithoutCursoInput = {
    create?: XOR<ModuloCreateWithoutCursoInput, ModuloUncheckedCreateWithoutCursoInput> | ModuloCreateWithoutCursoInput[] | ModuloUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ModuloCreateOrConnectWithoutCursoInput | ModuloCreateOrConnectWithoutCursoInput[]
    createMany?: ModuloCreateManyCursoInputEnvelope
    connect?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
  }

  export type InscripcionCreateNestedManyWithoutCursoInput = {
    create?: XOR<InscripcionCreateWithoutCursoInput, InscripcionUncheckedCreateWithoutCursoInput> | InscripcionCreateWithoutCursoInput[] | InscripcionUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutCursoInput | InscripcionCreateOrConnectWithoutCursoInput[]
    createMany?: InscripcionCreateManyCursoInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type ModuloUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<ModuloCreateWithoutCursoInput, ModuloUncheckedCreateWithoutCursoInput> | ModuloCreateWithoutCursoInput[] | ModuloUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ModuloCreateOrConnectWithoutCursoInput | ModuloCreateOrConnectWithoutCursoInput[]
    createMany?: ModuloCreateManyCursoInputEnvelope
    connect?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
  }

  export type InscripcionUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<InscripcionCreateWithoutCursoInput, InscripcionUncheckedCreateWithoutCursoInput> | InscripcionCreateWithoutCursoInput[] | InscripcionUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutCursoInput | InscripcionCreateOrConnectWithoutCursoInput[]
    createMany?: InscripcionCreateManyCursoInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCursosComoInstructorNestedInput = {
    create?: XOR<UserCreateWithoutCursosComoInstructorInput, UserUncheckedCreateWithoutCursosComoInstructorInput>
    connectOrCreate?: UserCreateOrConnectWithoutCursosComoInstructorInput
    upsert?: UserUpsertWithoutCursosComoInstructorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCursosComoInstructorInput, UserUpdateWithoutCursosComoInstructorInput>, UserUncheckedUpdateWithoutCursosComoInstructorInput>
  }

  export type ModuloUpdateManyWithoutCursoNestedInput = {
    create?: XOR<ModuloCreateWithoutCursoInput, ModuloUncheckedCreateWithoutCursoInput> | ModuloCreateWithoutCursoInput[] | ModuloUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ModuloCreateOrConnectWithoutCursoInput | ModuloCreateOrConnectWithoutCursoInput[]
    upsert?: ModuloUpsertWithWhereUniqueWithoutCursoInput | ModuloUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: ModuloCreateManyCursoInputEnvelope
    set?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    disconnect?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    delete?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    connect?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    update?: ModuloUpdateWithWhereUniqueWithoutCursoInput | ModuloUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: ModuloUpdateManyWithWhereWithoutCursoInput | ModuloUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: ModuloScalarWhereInput | ModuloScalarWhereInput[]
  }

  export type InscripcionUpdateManyWithoutCursoNestedInput = {
    create?: XOR<InscripcionCreateWithoutCursoInput, InscripcionUncheckedCreateWithoutCursoInput> | InscripcionCreateWithoutCursoInput[] | InscripcionUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutCursoInput | InscripcionCreateOrConnectWithoutCursoInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutCursoInput | InscripcionUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: InscripcionCreateManyCursoInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutCursoInput | InscripcionUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutCursoInput | InscripcionUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type ModuloUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<ModuloCreateWithoutCursoInput, ModuloUncheckedCreateWithoutCursoInput> | ModuloCreateWithoutCursoInput[] | ModuloUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ModuloCreateOrConnectWithoutCursoInput | ModuloCreateOrConnectWithoutCursoInput[]
    upsert?: ModuloUpsertWithWhereUniqueWithoutCursoInput | ModuloUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: ModuloCreateManyCursoInputEnvelope
    set?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    disconnect?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    delete?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    connect?: ModuloWhereUniqueInput | ModuloWhereUniqueInput[]
    update?: ModuloUpdateWithWhereUniqueWithoutCursoInput | ModuloUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: ModuloUpdateManyWithWhereWithoutCursoInput | ModuloUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: ModuloScalarWhereInput | ModuloScalarWhereInput[]
  }

  export type InscripcionUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<InscripcionCreateWithoutCursoInput, InscripcionUncheckedCreateWithoutCursoInput> | InscripcionCreateWithoutCursoInput[] | InscripcionUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutCursoInput | InscripcionCreateOrConnectWithoutCursoInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutCursoInput | InscripcionUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: InscripcionCreateManyCursoInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutCursoInput | InscripcionUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutCursoInput | InscripcionUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type CursoCreateNestedOneWithoutModulosInput = {
    create?: XOR<CursoCreateWithoutModulosInput, CursoUncheckedCreateWithoutModulosInput>
    connectOrCreate?: CursoCreateOrConnectWithoutModulosInput
    connect?: CursoWhereUniqueInput
  }

  export type MomentoCreateNestedManyWithoutModuloInput = {
    create?: XOR<MomentoCreateWithoutModuloInput, MomentoUncheckedCreateWithoutModuloInput> | MomentoCreateWithoutModuloInput[] | MomentoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: MomentoCreateOrConnectWithoutModuloInput | MomentoCreateOrConnectWithoutModuloInput[]
    createMany?: MomentoCreateManyModuloInputEnvelope
    connect?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
  }

  export type MomentoUncheckedCreateNestedManyWithoutModuloInput = {
    create?: XOR<MomentoCreateWithoutModuloInput, MomentoUncheckedCreateWithoutModuloInput> | MomentoCreateWithoutModuloInput[] | MomentoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: MomentoCreateOrConnectWithoutModuloInput | MomentoCreateOrConnectWithoutModuloInput[]
    createMany?: MomentoCreateManyModuloInputEnvelope
    connect?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
  }

  export type CursoUpdateOneRequiredWithoutModulosNestedInput = {
    create?: XOR<CursoCreateWithoutModulosInput, CursoUncheckedCreateWithoutModulosInput>
    connectOrCreate?: CursoCreateOrConnectWithoutModulosInput
    upsert?: CursoUpsertWithoutModulosInput
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutModulosInput, CursoUpdateWithoutModulosInput>, CursoUncheckedUpdateWithoutModulosInput>
  }

  export type MomentoUpdateManyWithoutModuloNestedInput = {
    create?: XOR<MomentoCreateWithoutModuloInput, MomentoUncheckedCreateWithoutModuloInput> | MomentoCreateWithoutModuloInput[] | MomentoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: MomentoCreateOrConnectWithoutModuloInput | MomentoCreateOrConnectWithoutModuloInput[]
    upsert?: MomentoUpsertWithWhereUniqueWithoutModuloInput | MomentoUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: MomentoCreateManyModuloInputEnvelope
    set?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    disconnect?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    delete?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    connect?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    update?: MomentoUpdateWithWhereUniqueWithoutModuloInput | MomentoUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: MomentoUpdateManyWithWhereWithoutModuloInput | MomentoUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: MomentoScalarWhereInput | MomentoScalarWhereInput[]
  }

  export type MomentoUncheckedUpdateManyWithoutModuloNestedInput = {
    create?: XOR<MomentoCreateWithoutModuloInput, MomentoUncheckedCreateWithoutModuloInput> | MomentoCreateWithoutModuloInput[] | MomentoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: MomentoCreateOrConnectWithoutModuloInput | MomentoCreateOrConnectWithoutModuloInput[]
    upsert?: MomentoUpsertWithWhereUniqueWithoutModuloInput | MomentoUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: MomentoCreateManyModuloInputEnvelope
    set?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    disconnect?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    delete?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    connect?: MomentoWhereUniqueInput | MomentoWhereUniqueInput[]
    update?: MomentoUpdateWithWhereUniqueWithoutModuloInput | MomentoUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: MomentoUpdateManyWithWhereWithoutModuloInput | MomentoUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: MomentoScalarWhereInput | MomentoScalarWhereInput[]
  }

  export type ModuloCreateNestedOneWithoutMomentosInput = {
    create?: XOR<ModuloCreateWithoutMomentosInput, ModuloUncheckedCreateWithoutMomentosInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutMomentosInput
    connect?: ModuloWhereUniqueInput
  }

  export type ActividadCreateNestedManyWithoutMomentoInput = {
    create?: XOR<ActividadCreateWithoutMomentoInput, ActividadUncheckedCreateWithoutMomentoInput> | ActividadCreateWithoutMomentoInput[] | ActividadUncheckedCreateWithoutMomentoInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutMomentoInput | ActividadCreateOrConnectWithoutMomentoInput[]
    createMany?: ActividadCreateManyMomentoInputEnvelope
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
  }

  export type ActividadUncheckedCreateNestedManyWithoutMomentoInput = {
    create?: XOR<ActividadCreateWithoutMomentoInput, ActividadUncheckedCreateWithoutMomentoInput> | ActividadCreateWithoutMomentoInput[] | ActividadUncheckedCreateWithoutMomentoInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutMomentoInput | ActividadCreateOrConnectWithoutMomentoInput[]
    createMany?: ActividadCreateManyMomentoInputEnvelope
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
  }

  export type ModuloUpdateOneRequiredWithoutMomentosNestedInput = {
    create?: XOR<ModuloCreateWithoutMomentosInput, ModuloUncheckedCreateWithoutMomentosInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutMomentosInput
    upsert?: ModuloUpsertWithoutMomentosInput
    connect?: ModuloWhereUniqueInput
    update?: XOR<XOR<ModuloUpdateToOneWithWhereWithoutMomentosInput, ModuloUpdateWithoutMomentosInput>, ModuloUncheckedUpdateWithoutMomentosInput>
  }

  export type ActividadUpdateManyWithoutMomentoNestedInput = {
    create?: XOR<ActividadCreateWithoutMomentoInput, ActividadUncheckedCreateWithoutMomentoInput> | ActividadCreateWithoutMomentoInput[] | ActividadUncheckedCreateWithoutMomentoInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutMomentoInput | ActividadCreateOrConnectWithoutMomentoInput[]
    upsert?: ActividadUpsertWithWhereUniqueWithoutMomentoInput | ActividadUpsertWithWhereUniqueWithoutMomentoInput[]
    createMany?: ActividadCreateManyMomentoInputEnvelope
    set?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    disconnect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    delete?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    update?: ActividadUpdateWithWhereUniqueWithoutMomentoInput | ActividadUpdateWithWhereUniqueWithoutMomentoInput[]
    updateMany?: ActividadUpdateManyWithWhereWithoutMomentoInput | ActividadUpdateManyWithWhereWithoutMomentoInput[]
    deleteMany?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
  }

  export type ActividadUncheckedUpdateManyWithoutMomentoNestedInput = {
    create?: XOR<ActividadCreateWithoutMomentoInput, ActividadUncheckedCreateWithoutMomentoInput> | ActividadCreateWithoutMomentoInput[] | ActividadUncheckedCreateWithoutMomentoInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutMomentoInput | ActividadCreateOrConnectWithoutMomentoInput[]
    upsert?: ActividadUpsertWithWhereUniqueWithoutMomentoInput | ActividadUpsertWithWhereUniqueWithoutMomentoInput[]
    createMany?: ActividadCreateManyMomentoInputEnvelope
    set?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    disconnect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    delete?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    update?: ActividadUpdateWithWhereUniqueWithoutMomentoInput | ActividadUpdateWithWhereUniqueWithoutMomentoInput[]
    updateMany?: ActividadUpdateManyWithWhereWithoutMomentoInput | ActividadUpdateManyWithWhereWithoutMomentoInput[]
    deleteMany?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
  }

  export type MomentoCreateNestedOneWithoutActividadesInput = {
    create?: XOR<MomentoCreateWithoutActividadesInput, MomentoUncheckedCreateWithoutActividadesInput>
    connectOrCreate?: MomentoCreateOrConnectWithoutActividadesInput
    connect?: MomentoWhereUniqueInput
  }

  export type ProgresoActividadCreateNestedManyWithoutActividadInput = {
    create?: XOR<ProgresoActividadCreateWithoutActividadInput, ProgresoActividadUncheckedCreateWithoutActividadInput> | ProgresoActividadCreateWithoutActividadInput[] | ProgresoActividadUncheckedCreateWithoutActividadInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutActividadInput | ProgresoActividadCreateOrConnectWithoutActividadInput[]
    createMany?: ProgresoActividadCreateManyActividadInputEnvelope
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
  }

  export type ProgresoActividadUncheckedCreateNestedManyWithoutActividadInput = {
    create?: XOR<ProgresoActividadCreateWithoutActividadInput, ProgresoActividadUncheckedCreateWithoutActividadInput> | ProgresoActividadCreateWithoutActividadInput[] | ProgresoActividadUncheckedCreateWithoutActividadInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutActividadInput | ProgresoActividadCreateOrConnectWithoutActividadInput[]
    createMany?: ProgresoActividadCreateManyActividadInputEnvelope
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
  }

  export type MomentoUpdateOneRequiredWithoutActividadesNestedInput = {
    create?: XOR<MomentoCreateWithoutActividadesInput, MomentoUncheckedCreateWithoutActividadesInput>
    connectOrCreate?: MomentoCreateOrConnectWithoutActividadesInput
    upsert?: MomentoUpsertWithoutActividadesInput
    connect?: MomentoWhereUniqueInput
    update?: XOR<XOR<MomentoUpdateToOneWithWhereWithoutActividadesInput, MomentoUpdateWithoutActividadesInput>, MomentoUncheckedUpdateWithoutActividadesInput>
  }

  export type ProgresoActividadUpdateManyWithoutActividadNestedInput = {
    create?: XOR<ProgresoActividadCreateWithoutActividadInput, ProgresoActividadUncheckedCreateWithoutActividadInput> | ProgresoActividadCreateWithoutActividadInput[] | ProgresoActividadUncheckedCreateWithoutActividadInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutActividadInput | ProgresoActividadCreateOrConnectWithoutActividadInput[]
    upsert?: ProgresoActividadUpsertWithWhereUniqueWithoutActividadInput | ProgresoActividadUpsertWithWhereUniqueWithoutActividadInput[]
    createMany?: ProgresoActividadCreateManyActividadInputEnvelope
    set?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    disconnect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    delete?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    update?: ProgresoActividadUpdateWithWhereUniqueWithoutActividadInput | ProgresoActividadUpdateWithWhereUniqueWithoutActividadInput[]
    updateMany?: ProgresoActividadUpdateManyWithWhereWithoutActividadInput | ProgresoActividadUpdateManyWithWhereWithoutActividadInput[]
    deleteMany?: ProgresoActividadScalarWhereInput | ProgresoActividadScalarWhereInput[]
  }

  export type ProgresoActividadUncheckedUpdateManyWithoutActividadNestedInput = {
    create?: XOR<ProgresoActividadCreateWithoutActividadInput, ProgresoActividadUncheckedCreateWithoutActividadInput> | ProgresoActividadCreateWithoutActividadInput[] | ProgresoActividadUncheckedCreateWithoutActividadInput[]
    connectOrCreate?: ProgresoActividadCreateOrConnectWithoutActividadInput | ProgresoActividadCreateOrConnectWithoutActividadInput[]
    upsert?: ProgresoActividadUpsertWithWhereUniqueWithoutActividadInput | ProgresoActividadUpsertWithWhereUniqueWithoutActividadInput[]
    createMany?: ProgresoActividadCreateManyActividadInputEnvelope
    set?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    disconnect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    delete?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    connect?: ProgresoActividadWhereUniqueInput | ProgresoActividadWhereUniqueInput[]
    update?: ProgresoActividadUpdateWithWhereUniqueWithoutActividadInput | ProgresoActividadUpdateWithWhereUniqueWithoutActividadInput[]
    updateMany?: ProgresoActividadUpdateManyWithWhereWithoutActividadInput | ProgresoActividadUpdateManyWithWhereWithoutActividadInput[]
    deleteMany?: ProgresoActividadScalarWhereInput | ProgresoActividadScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProgresoActividadesInput = {
    create?: XOR<UserCreateWithoutProgresoActividadesInput, UserUncheckedCreateWithoutProgresoActividadesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgresoActividadesInput
    connect?: UserWhereUniqueInput
  }

  export type ActividadCreateNestedOneWithoutProgresosInput = {
    create?: XOR<ActividadCreateWithoutProgresosInput, ActividadUncheckedCreateWithoutProgresosInput>
    connectOrCreate?: ActividadCreateOrConnectWithoutProgresosInput
    connect?: ActividadWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutProgresoActividadesNestedInput = {
    create?: XOR<UserCreateWithoutProgresoActividadesInput, UserUncheckedCreateWithoutProgresoActividadesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgresoActividadesInput
    upsert?: UserUpsertWithoutProgresoActividadesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgresoActividadesInput, UserUpdateWithoutProgresoActividadesInput>, UserUncheckedUpdateWithoutProgresoActividadesInput>
  }

  export type ActividadUpdateOneRequiredWithoutProgresosNestedInput = {
    create?: XOR<ActividadCreateWithoutProgresosInput, ActividadUncheckedCreateWithoutProgresosInput>
    connectOrCreate?: ActividadCreateOrConnectWithoutProgresosInput
    upsert?: ActividadUpsertWithoutProgresosInput
    connect?: ActividadWhereUniqueInput
    update?: XOR<XOR<ActividadUpdateToOneWithWhereWithoutProgresosInput, ActividadUpdateWithoutProgresosInput>, ActividadUncheckedUpdateWithoutProgresosInput>
  }

  export type UserCreateNestedOneWithoutInsigniasInput = {
    create?: XOR<UserCreateWithoutInsigniasInput, UserUncheckedCreateWithoutInsigniasInput>
    connectOrCreate?: UserCreateOrConnectWithoutInsigniasInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutInsigniasNestedInput = {
    create?: XOR<UserCreateWithoutInsigniasInput, UserUncheckedCreateWithoutInsigniasInput>
    connectOrCreate?: UserCreateOrConnectWithoutInsigniasInput
    upsert?: UserUpsertWithoutInsigniasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInsigniasInput, UserUpdateWithoutInsigniasInput>, UserUncheckedUpdateWithoutInsigniasInput>
  }

  export type UserCreateNestedOneWithoutTestResultadosInput = {
    create?: XOR<UserCreateWithoutTestResultadosInput, UserUncheckedCreateWithoutTestResultadosInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestResultadosInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTestResultadosNestedInput = {
    create?: XOR<UserCreateWithoutTestResultadosInput, UserUncheckedCreateWithoutTestResultadosInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestResultadosInput
    upsert?: UserUpsertWithoutTestResultadosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTestResultadosInput, UserUpdateWithoutTestResultadosInput>, UserUncheckedUpdateWithoutTestResultadosInput>
  }

  export type UserCreateNestedOneWithoutInscripcionesInput = {
    create?: XOR<UserCreateWithoutInscripcionesInput, UserUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInscripcionesInput
    connect?: UserWhereUniqueInput
  }

  export type CursoCreateNestedOneWithoutInscripcionesInput = {
    create?: XOR<CursoCreateWithoutInscripcionesInput, CursoUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: CursoCreateOrConnectWithoutInscripcionesInput
    connect?: CursoWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutInscripcionesNestedInput = {
    create?: XOR<UserCreateWithoutInscripcionesInput, UserUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInscripcionesInput
    upsert?: UserUpsertWithoutInscripcionesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInscripcionesInput, UserUpdateWithoutInscripcionesInput>, UserUncheckedUpdateWithoutInscripcionesInput>
  }

  export type CursoUpdateOneRequiredWithoutInscripcionesNestedInput = {
    create?: XOR<CursoCreateWithoutInscripcionesInput, CursoUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: CursoCreateOrConnectWithoutInscripcionesInput
    upsert?: CursoUpsertWithoutInscripcionesInput
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutInscripcionesInput, CursoUpdateWithoutInscripcionesInput>, CursoUncheckedUpdateWithoutInscripcionesInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserCreateNestedOneWithoutNotificacionesInput = {
    create?: XOR<UserCreateWithoutNotificacionesInput, UserUncheckedCreateWithoutNotificacionesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificacionesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificacionesNestedInput = {
    create?: XOR<UserCreateWithoutNotificacionesInput, UserUncheckedCreateWithoutNotificacionesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificacionesInput
    upsert?: UserUpsertWithoutNotificacionesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificacionesInput, UserUpdateWithoutNotificacionesInput>, UserUncheckedUpdateWithoutNotificacionesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CursoCreateWithoutInstructorInput = {
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    modulos?: ModuloCreateNestedManyWithoutCursoInput
    inscripciones?: InscripcionCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutInstructorInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    modulos?: ModuloUncheckedCreateNestedManyWithoutCursoInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutInstructorInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutInstructorInput, CursoUncheckedCreateWithoutInstructorInput>
  }

  export type CursoCreateManyInstructorInputEnvelope = {
    data: CursoCreateManyInstructorInput | CursoCreateManyInstructorInput[]
    skipDuplicates?: boolean
  }

  export type InscripcionCreateWithoutAprendizInput = {
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    curso: CursoCreateNestedOneWithoutInscripcionesInput
  }

  export type InscripcionUncheckedCreateWithoutAprendizInput = {
    id?: number
    cursoId: number
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscripcionCreateOrConnectWithoutAprendizInput = {
    where: InscripcionWhereUniqueInput
    create: XOR<InscripcionCreateWithoutAprendizInput, InscripcionUncheckedCreateWithoutAprendizInput>
  }

  export type InscripcionCreateManyAprendizInputEnvelope = {
    data: InscripcionCreateManyAprendizInput | InscripcionCreateManyAprendizInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUsuarioInput = {
    accion: string
    recurso: string
    recursoId?: number | null
    detalle?: string | null
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUsuarioInput = {
    id?: number
    accion: string
    recurso: string
    recursoId?: number | null
    detalle?: string | null
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUsuarioInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUsuarioInput, AuditLogUncheckedCreateWithoutUsuarioInput>
  }

  export type AuditLogCreateManyUsuarioInputEnvelope = {
    data: AuditLogCreateManyUsuarioInput | AuditLogCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type NotificacionCreateWithoutDestinatarioInput = {
    tipo: string
    asunto: string
    mensaje: string
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: Date | string
  }

  export type NotificacionUncheckedCreateWithoutDestinatarioInput = {
    id?: number
    tipo: string
    asunto: string
    mensaje: string
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: Date | string
  }

  export type NotificacionCreateOrConnectWithoutDestinatarioInput = {
    where: NotificacionWhereUniqueInput
    create: XOR<NotificacionCreateWithoutDestinatarioInput, NotificacionUncheckedCreateWithoutDestinatarioInput>
  }

  export type NotificacionCreateManyDestinatarioInputEnvelope = {
    data: NotificacionCreateManyDestinatarioInput | NotificacionCreateManyDestinatarioInput[]
    skipDuplicates?: boolean
  }

  export type ProgresoActividadCreateWithoutAprendizInput = {
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    actividad: ActividadCreateNestedOneWithoutProgresosInput
  }

  export type ProgresoActividadUncheckedCreateWithoutAprendizInput = {
    id?: number
    actividadId: number
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgresoActividadCreateOrConnectWithoutAprendizInput = {
    where: ProgresoActividadWhereUniqueInput
    create: XOR<ProgresoActividadCreateWithoutAprendizInput, ProgresoActividadUncheckedCreateWithoutAprendizInput>
  }

  export type ProgresoActividadCreateManyAprendizInputEnvelope = {
    data: ProgresoActividadCreateManyAprendizInput | ProgresoActividadCreateManyAprendizInput[]
    skipDuplicates?: boolean
  }

  export type InsigniaAprendizCreateWithoutAprendizInput = {
    cursoId: number
    moduloId?: number | null
    tipo: string
    nombre: string
    descripcion?: string | null
    emoji?: string | null
    otorgadaAt?: Date | string
  }

  export type InsigniaAprendizUncheckedCreateWithoutAprendizInput = {
    id?: number
    cursoId: number
    moduloId?: number | null
    tipo: string
    nombre: string
    descripcion?: string | null
    emoji?: string | null
    otorgadaAt?: Date | string
  }

  export type InsigniaAprendizCreateOrConnectWithoutAprendizInput = {
    where: InsigniaAprendizWhereUniqueInput
    create: XOR<InsigniaAprendizCreateWithoutAprendizInput, InsigniaAprendizUncheckedCreateWithoutAprendizInput>
  }

  export type InsigniaAprendizCreateManyAprendizInputEnvelope = {
    data: InsigniaAprendizCreateManyAprendizInput | InsigniaAprendizCreateManyAprendizInput[]
    skipDuplicates?: boolean
  }

  export type TestResultadoCreateWithoutAprendizInput = {
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonNullValueInput | InputJsonValue
    completadoAt?: Date | string
  }

  export type TestResultadoUncheckedCreateWithoutAprendizInput = {
    id?: number
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonNullValueInput | InputJsonValue
    completadoAt?: Date | string
  }

  export type TestResultadoCreateOrConnectWithoutAprendizInput = {
    where: TestResultadoWhereUniqueInput
    create: XOR<TestResultadoCreateWithoutAprendizInput, TestResultadoUncheckedCreateWithoutAprendizInput>
  }

  export type TestResultadoCreateManyAprendizInputEnvelope = {
    data: TestResultadoCreateManyAprendizInput | TestResultadoCreateManyAprendizInput[]
    skipDuplicates?: boolean
  }

  export type CursoUpsertWithWhereUniqueWithoutInstructorInput = {
    where: CursoWhereUniqueInput
    update: XOR<CursoUpdateWithoutInstructorInput, CursoUncheckedUpdateWithoutInstructorInput>
    create: XOR<CursoCreateWithoutInstructorInput, CursoUncheckedCreateWithoutInstructorInput>
  }

  export type CursoUpdateWithWhereUniqueWithoutInstructorInput = {
    where: CursoWhereUniqueInput
    data: XOR<CursoUpdateWithoutInstructorInput, CursoUncheckedUpdateWithoutInstructorInput>
  }

  export type CursoUpdateManyWithWhereWithoutInstructorInput = {
    where: CursoScalarWhereInput
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyWithoutInstructorInput>
  }

  export type CursoScalarWhereInput = {
    AND?: CursoScalarWhereInput | CursoScalarWhereInput[]
    OR?: CursoScalarWhereInput[]
    NOT?: CursoScalarWhereInput | CursoScalarWhereInput[]
    id?: IntFilter<"Curso"> | number
    titulo?: StringFilter<"Curso"> | string
    descripcion?: StringNullableFilter<"Curso"> | string | null
    nivel?: StringFilter<"Curso"> | string
    estado?: BoolFilter<"Curso"> | boolean
    instructorId?: IntFilter<"Curso"> | number
    createdAt?: DateTimeFilter<"Curso"> | Date | string
    updatedAt?: DateTimeFilter<"Curso"> | Date | string
  }

  export type InscripcionUpsertWithWhereUniqueWithoutAprendizInput = {
    where: InscripcionWhereUniqueInput
    update: XOR<InscripcionUpdateWithoutAprendizInput, InscripcionUncheckedUpdateWithoutAprendizInput>
    create: XOR<InscripcionCreateWithoutAprendizInput, InscripcionUncheckedCreateWithoutAprendizInput>
  }

  export type InscripcionUpdateWithWhereUniqueWithoutAprendizInput = {
    where: InscripcionWhereUniqueInput
    data: XOR<InscripcionUpdateWithoutAprendizInput, InscripcionUncheckedUpdateWithoutAprendizInput>
  }

  export type InscripcionUpdateManyWithWhereWithoutAprendizInput = {
    where: InscripcionScalarWhereInput
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyWithoutAprendizInput>
  }

  export type InscripcionScalarWhereInput = {
    AND?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
    OR?: InscripcionScalarWhereInput[]
    NOT?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
    id?: IntFilter<"Inscripcion"> | number
    aprendizId?: IntFilter<"Inscripcion"> | number
    cursoId?: IntFilter<"Inscripcion"> | number
    progreso?: FloatFilter<"Inscripcion"> | number
    estado?: StringFilter<"Inscripcion"> | string
    createdAt?: DateTimeFilter<"Inscripcion"> | Date | string
    updatedAt?: DateTimeFilter<"Inscripcion"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUsuarioInput, AuditLogUncheckedUpdateWithoutUsuarioInput>
    create: XOR<AuditLogCreateWithoutUsuarioInput, AuditLogUncheckedCreateWithoutUsuarioInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUsuarioInput, AuditLogUncheckedUpdateWithoutUsuarioInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUsuarioInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    accion?: StringFilter<"AuditLog"> | string
    recurso?: StringFilter<"AuditLog"> | string
    recursoId?: IntNullableFilter<"AuditLog"> | number | null
    detalle?: StringNullableFilter<"AuditLog"> | string | null
    usuarioId?: IntNullableFilter<"AuditLog"> | number | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type NotificacionUpsertWithWhereUniqueWithoutDestinatarioInput = {
    where: NotificacionWhereUniqueInput
    update: XOR<NotificacionUpdateWithoutDestinatarioInput, NotificacionUncheckedUpdateWithoutDestinatarioInput>
    create: XOR<NotificacionCreateWithoutDestinatarioInput, NotificacionUncheckedCreateWithoutDestinatarioInput>
  }

  export type NotificacionUpdateWithWhereUniqueWithoutDestinatarioInput = {
    where: NotificacionWhereUniqueInput
    data: XOR<NotificacionUpdateWithoutDestinatarioInput, NotificacionUncheckedUpdateWithoutDestinatarioInput>
  }

  export type NotificacionUpdateManyWithWhereWithoutDestinatarioInput = {
    where: NotificacionScalarWhereInput
    data: XOR<NotificacionUpdateManyMutationInput, NotificacionUncheckedUpdateManyWithoutDestinatarioInput>
  }

  export type NotificacionScalarWhereInput = {
    AND?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
    OR?: NotificacionScalarWhereInput[]
    NOT?: NotificacionScalarWhereInput | NotificacionScalarWhereInput[]
    id?: IntFilter<"Notificacion"> | number
    tipo?: StringFilter<"Notificacion"> | string
    asunto?: StringFilter<"Notificacion"> | string
    mensaje?: StringFilter<"Notificacion"> | string
    destinatarioId?: IntFilter<"Notificacion"> | number
    leida?: BoolFilter<"Notificacion"> | boolean
    enviadoPorEmail?: BoolFilter<"Notificacion"> | boolean
    createdAt?: DateTimeFilter<"Notificacion"> | Date | string
  }

  export type ProgresoActividadUpsertWithWhereUniqueWithoutAprendizInput = {
    where: ProgresoActividadWhereUniqueInput
    update: XOR<ProgresoActividadUpdateWithoutAprendizInput, ProgresoActividadUncheckedUpdateWithoutAprendizInput>
    create: XOR<ProgresoActividadCreateWithoutAprendizInput, ProgresoActividadUncheckedCreateWithoutAprendizInput>
  }

  export type ProgresoActividadUpdateWithWhereUniqueWithoutAprendizInput = {
    where: ProgresoActividadWhereUniqueInput
    data: XOR<ProgresoActividadUpdateWithoutAprendizInput, ProgresoActividadUncheckedUpdateWithoutAprendizInput>
  }

  export type ProgresoActividadUpdateManyWithWhereWithoutAprendizInput = {
    where: ProgresoActividadScalarWhereInput
    data: XOR<ProgresoActividadUpdateManyMutationInput, ProgresoActividadUncheckedUpdateManyWithoutAprendizInput>
  }

  export type ProgresoActividadScalarWhereInput = {
    AND?: ProgresoActividadScalarWhereInput | ProgresoActividadScalarWhereInput[]
    OR?: ProgresoActividadScalarWhereInput[]
    NOT?: ProgresoActividadScalarWhereInput | ProgresoActividadScalarWhereInput[]
    id?: IntFilter<"ProgresoActividad"> | number
    aprendizId?: IntFilter<"ProgresoActividad"> | number
    actividadId?: IntFilter<"ProgresoActividad"> | number
    completada?: BoolFilter<"ProgresoActividad"> | boolean
    intentos?: IntFilter<"ProgresoActividad"> | number
    puntaje?: FloatNullableFilter<"ProgresoActividad"> | number | null
    respuesta?: JsonNullableFilter<"ProgresoActividad">
    completadoAt?: DateTimeNullableFilter<"ProgresoActividad"> | Date | string | null
    createdAt?: DateTimeFilter<"ProgresoActividad"> | Date | string
    updatedAt?: DateTimeFilter<"ProgresoActividad"> | Date | string
  }

  export type InsigniaAprendizUpsertWithWhereUniqueWithoutAprendizInput = {
    where: InsigniaAprendizWhereUniqueInput
    update: XOR<InsigniaAprendizUpdateWithoutAprendizInput, InsigniaAprendizUncheckedUpdateWithoutAprendizInput>
    create: XOR<InsigniaAprendizCreateWithoutAprendizInput, InsigniaAprendizUncheckedCreateWithoutAprendizInput>
  }

  export type InsigniaAprendizUpdateWithWhereUniqueWithoutAprendizInput = {
    where: InsigniaAprendizWhereUniqueInput
    data: XOR<InsigniaAprendizUpdateWithoutAprendizInput, InsigniaAprendizUncheckedUpdateWithoutAprendizInput>
  }

  export type InsigniaAprendizUpdateManyWithWhereWithoutAprendizInput = {
    where: InsigniaAprendizScalarWhereInput
    data: XOR<InsigniaAprendizUpdateManyMutationInput, InsigniaAprendizUncheckedUpdateManyWithoutAprendizInput>
  }

  export type InsigniaAprendizScalarWhereInput = {
    AND?: InsigniaAprendizScalarWhereInput | InsigniaAprendizScalarWhereInput[]
    OR?: InsigniaAprendizScalarWhereInput[]
    NOT?: InsigniaAprendizScalarWhereInput | InsigniaAprendizScalarWhereInput[]
    id?: IntFilter<"InsigniaAprendiz"> | number
    aprendizId?: IntFilter<"InsigniaAprendiz"> | number
    cursoId?: IntFilter<"InsigniaAprendiz"> | number
    moduloId?: IntNullableFilter<"InsigniaAprendiz"> | number | null
    tipo?: StringFilter<"InsigniaAprendiz"> | string
    nombre?: StringFilter<"InsigniaAprendiz"> | string
    descripcion?: StringNullableFilter<"InsigniaAprendiz"> | string | null
    emoji?: StringNullableFilter<"InsigniaAprendiz"> | string | null
    otorgadaAt?: DateTimeFilter<"InsigniaAprendiz"> | Date | string
  }

  export type TestResultadoUpsertWithWhereUniqueWithoutAprendizInput = {
    where: TestResultadoWhereUniqueInput
    update: XOR<TestResultadoUpdateWithoutAprendizInput, TestResultadoUncheckedUpdateWithoutAprendizInput>
    create: XOR<TestResultadoCreateWithoutAprendizInput, TestResultadoUncheckedCreateWithoutAprendizInput>
  }

  export type TestResultadoUpdateWithWhereUniqueWithoutAprendizInput = {
    where: TestResultadoWhereUniqueInput
    data: XOR<TestResultadoUpdateWithoutAprendizInput, TestResultadoUncheckedUpdateWithoutAprendizInput>
  }

  export type TestResultadoUpdateManyWithWhereWithoutAprendizInput = {
    where: TestResultadoScalarWhereInput
    data: XOR<TestResultadoUpdateManyMutationInput, TestResultadoUncheckedUpdateManyWithoutAprendizInput>
  }

  export type TestResultadoScalarWhereInput = {
    AND?: TestResultadoScalarWhereInput | TestResultadoScalarWhereInput[]
    OR?: TestResultadoScalarWhereInput[]
    NOT?: TestResultadoScalarWhereInput | TestResultadoScalarWhereInput[]
    id?: IntFilter<"TestResultado"> | number
    aprendizId?: IntFilter<"TestResultado"> | number
    cursoId?: IntFilter<"TestResultado"> | number
    tipo?: StringFilter<"TestResultado"> | string
    puntaje?: FloatFilter<"TestResultado"> | number
    total?: IntFilter<"TestResultado"> | number
    correctas?: IntFilter<"TestResultado"> | number
    respuestas?: JsonFilter<"TestResultado">
    completadoAt?: DateTimeFilter<"TestResultado"> | Date | string
  }

  export type UserCreateWithoutCursosComoInstructorInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutCursosComoInstructorInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutCursosComoInstructorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCursosComoInstructorInput, UserUncheckedCreateWithoutCursosComoInstructorInput>
  }

  export type ModuloCreateWithoutCursoInput = {
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    momentos?: MomentoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateWithoutCursoInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    momentos?: MomentoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloCreateOrConnectWithoutCursoInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutCursoInput, ModuloUncheckedCreateWithoutCursoInput>
  }

  export type ModuloCreateManyCursoInputEnvelope = {
    data: ModuloCreateManyCursoInput | ModuloCreateManyCursoInput[]
    skipDuplicates?: boolean
  }

  export type InscripcionCreateWithoutCursoInput = {
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aprendiz: UserCreateNestedOneWithoutInscripcionesInput
  }

  export type InscripcionUncheckedCreateWithoutCursoInput = {
    id?: number
    aprendizId: number
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscripcionCreateOrConnectWithoutCursoInput = {
    where: InscripcionWhereUniqueInput
    create: XOR<InscripcionCreateWithoutCursoInput, InscripcionUncheckedCreateWithoutCursoInput>
  }

  export type InscripcionCreateManyCursoInputEnvelope = {
    data: InscripcionCreateManyCursoInput | InscripcionCreateManyCursoInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCursosComoInstructorInput = {
    update: XOR<UserUpdateWithoutCursosComoInstructorInput, UserUncheckedUpdateWithoutCursosComoInstructorInput>
    create: XOR<UserCreateWithoutCursosComoInstructorInput, UserUncheckedCreateWithoutCursosComoInstructorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCursosComoInstructorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCursosComoInstructorInput, UserUncheckedUpdateWithoutCursosComoInstructorInput>
  }

  export type UserUpdateWithoutCursosComoInstructorInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutCursosComoInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type ModuloUpsertWithWhereUniqueWithoutCursoInput = {
    where: ModuloWhereUniqueInput
    update: XOR<ModuloUpdateWithoutCursoInput, ModuloUncheckedUpdateWithoutCursoInput>
    create: XOR<ModuloCreateWithoutCursoInput, ModuloUncheckedCreateWithoutCursoInput>
  }

  export type ModuloUpdateWithWhereUniqueWithoutCursoInput = {
    where: ModuloWhereUniqueInput
    data: XOR<ModuloUpdateWithoutCursoInput, ModuloUncheckedUpdateWithoutCursoInput>
  }

  export type ModuloUpdateManyWithWhereWithoutCursoInput = {
    where: ModuloScalarWhereInput
    data: XOR<ModuloUpdateManyMutationInput, ModuloUncheckedUpdateManyWithoutCursoInput>
  }

  export type ModuloScalarWhereInput = {
    AND?: ModuloScalarWhereInput | ModuloScalarWhereInput[]
    OR?: ModuloScalarWhereInput[]
    NOT?: ModuloScalarWhereInput | ModuloScalarWhereInput[]
    id?: IntFilter<"Modulo"> | number
    titulo?: StringFilter<"Modulo"> | string
    descripcion?: StringNullableFilter<"Modulo"> | string | null
    contenido?: StringNullableFilter<"Modulo"> | string | null
    orden?: IntFilter<"Modulo"> | number
    estado?: BoolFilter<"Modulo"> | boolean
    cursoId?: IntFilter<"Modulo"> | number
    createdAt?: DateTimeFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeFilter<"Modulo"> | Date | string
  }

  export type InscripcionUpsertWithWhereUniqueWithoutCursoInput = {
    where: InscripcionWhereUniqueInput
    update: XOR<InscripcionUpdateWithoutCursoInput, InscripcionUncheckedUpdateWithoutCursoInput>
    create: XOR<InscripcionCreateWithoutCursoInput, InscripcionUncheckedCreateWithoutCursoInput>
  }

  export type InscripcionUpdateWithWhereUniqueWithoutCursoInput = {
    where: InscripcionWhereUniqueInput
    data: XOR<InscripcionUpdateWithoutCursoInput, InscripcionUncheckedUpdateWithoutCursoInput>
  }

  export type InscripcionUpdateManyWithWhereWithoutCursoInput = {
    where: InscripcionScalarWhereInput
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyWithoutCursoInput>
  }

  export type CursoCreateWithoutModulosInput = {
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instructor: UserCreateNestedOneWithoutCursosComoInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutModulosInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    instructorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutModulosInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutModulosInput, CursoUncheckedCreateWithoutModulosInput>
  }

  export type MomentoCreateWithoutModuloInput = {
    nombre: string
    tipo: string
    orden?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    actividades?: ActividadCreateNestedManyWithoutMomentoInput
  }

  export type MomentoUncheckedCreateWithoutModuloInput = {
    id?: number
    nombre: string
    tipo: string
    orden?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    actividades?: ActividadUncheckedCreateNestedManyWithoutMomentoInput
  }

  export type MomentoCreateOrConnectWithoutModuloInput = {
    where: MomentoWhereUniqueInput
    create: XOR<MomentoCreateWithoutModuloInput, MomentoUncheckedCreateWithoutModuloInput>
  }

  export type MomentoCreateManyModuloInputEnvelope = {
    data: MomentoCreateManyModuloInput | MomentoCreateManyModuloInput[]
    skipDuplicates?: boolean
  }

  export type CursoUpsertWithoutModulosInput = {
    update: XOR<CursoUpdateWithoutModulosInput, CursoUncheckedUpdateWithoutModulosInput>
    create: XOR<CursoCreateWithoutModulosInput, CursoUncheckedCreateWithoutModulosInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutModulosInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutModulosInput, CursoUncheckedUpdateWithoutModulosInput>
  }

  export type CursoUpdateWithoutModulosInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instructor?: UserUpdateOneRequiredWithoutCursosComoInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutModulosInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    instructorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscripciones?: InscripcionUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type MomentoUpsertWithWhereUniqueWithoutModuloInput = {
    where: MomentoWhereUniqueInput
    update: XOR<MomentoUpdateWithoutModuloInput, MomentoUncheckedUpdateWithoutModuloInput>
    create: XOR<MomentoCreateWithoutModuloInput, MomentoUncheckedCreateWithoutModuloInput>
  }

  export type MomentoUpdateWithWhereUniqueWithoutModuloInput = {
    where: MomentoWhereUniqueInput
    data: XOR<MomentoUpdateWithoutModuloInput, MomentoUncheckedUpdateWithoutModuloInput>
  }

  export type MomentoUpdateManyWithWhereWithoutModuloInput = {
    where: MomentoScalarWhereInput
    data: XOR<MomentoUpdateManyMutationInput, MomentoUncheckedUpdateManyWithoutModuloInput>
  }

  export type MomentoScalarWhereInput = {
    AND?: MomentoScalarWhereInput | MomentoScalarWhereInput[]
    OR?: MomentoScalarWhereInput[]
    NOT?: MomentoScalarWhereInput | MomentoScalarWhereInput[]
    id?: IntFilter<"Momento"> | number
    nombre?: StringFilter<"Momento"> | string
    tipo?: StringFilter<"Momento"> | string
    orden?: IntFilter<"Momento"> | number
    moduloId?: IntFilter<"Momento"> | number
    createdAt?: DateTimeFilter<"Momento"> | Date | string
    updatedAt?: DateTimeFilter<"Momento"> | Date | string
  }

  export type ModuloCreateWithoutMomentosInput = {
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    curso: CursoCreateNestedOneWithoutModulosInput
  }

  export type ModuloUncheckedCreateWithoutMomentosInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    cursoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloCreateOrConnectWithoutMomentosInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutMomentosInput, ModuloUncheckedCreateWithoutMomentosInput>
  }

  export type ActividadCreateWithoutMomentoInput = {
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    progresos?: ProgresoActividadCreateNestedManyWithoutActividadInput
  }

  export type ActividadUncheckedCreateWithoutMomentoInput = {
    id?: number
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    progresos?: ProgresoActividadUncheckedCreateNestedManyWithoutActividadInput
  }

  export type ActividadCreateOrConnectWithoutMomentoInput = {
    where: ActividadWhereUniqueInput
    create: XOR<ActividadCreateWithoutMomentoInput, ActividadUncheckedCreateWithoutMomentoInput>
  }

  export type ActividadCreateManyMomentoInputEnvelope = {
    data: ActividadCreateManyMomentoInput | ActividadCreateManyMomentoInput[]
    skipDuplicates?: boolean
  }

  export type ModuloUpsertWithoutMomentosInput = {
    update: XOR<ModuloUpdateWithoutMomentosInput, ModuloUncheckedUpdateWithoutMomentosInput>
    create: XOR<ModuloCreateWithoutMomentosInput, ModuloUncheckedCreateWithoutMomentosInput>
    where?: ModuloWhereInput
  }

  export type ModuloUpdateToOneWithWhereWithoutMomentosInput = {
    where?: ModuloWhereInput
    data: XOR<ModuloUpdateWithoutMomentosInput, ModuloUncheckedUpdateWithoutMomentosInput>
  }

  export type ModuloUpdateWithoutMomentosInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutModulosNestedInput
  }

  export type ModuloUncheckedUpdateWithoutMomentosInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    cursoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActividadUpsertWithWhereUniqueWithoutMomentoInput = {
    where: ActividadWhereUniqueInput
    update: XOR<ActividadUpdateWithoutMomentoInput, ActividadUncheckedUpdateWithoutMomentoInput>
    create: XOR<ActividadCreateWithoutMomentoInput, ActividadUncheckedCreateWithoutMomentoInput>
  }

  export type ActividadUpdateWithWhereUniqueWithoutMomentoInput = {
    where: ActividadWhereUniqueInput
    data: XOR<ActividadUpdateWithoutMomentoInput, ActividadUncheckedUpdateWithoutMomentoInput>
  }

  export type ActividadUpdateManyWithWhereWithoutMomentoInput = {
    where: ActividadScalarWhereInput
    data: XOR<ActividadUpdateManyMutationInput, ActividadUncheckedUpdateManyWithoutMomentoInput>
  }

  export type ActividadScalarWhereInput = {
    AND?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
    OR?: ActividadScalarWhereInput[]
    NOT?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
    id?: IntFilter<"Actividad"> | number
    tipo?: StringFilter<"Actividad"> | string
    titulo?: StringFilter<"Actividad"> | string
    instrucciones?: StringNullableFilter<"Actividad"> | string | null
    contenido?: JsonFilter<"Actividad">
    orden?: IntFilter<"Actividad"> | number
    estado?: BoolFilter<"Actividad"> | boolean
    momentoId?: IntFilter<"Actividad"> | number
    createdAt?: DateTimeFilter<"Actividad"> | Date | string
    updatedAt?: DateTimeFilter<"Actividad"> | Date | string
  }

  export type MomentoCreateWithoutActividadesInput = {
    nombre: string
    tipo: string
    orden?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutMomentosInput
  }

  export type MomentoUncheckedCreateWithoutActividadesInput = {
    id?: number
    nombre: string
    tipo: string
    orden?: number
    moduloId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomentoCreateOrConnectWithoutActividadesInput = {
    where: MomentoWhereUniqueInput
    create: XOR<MomentoCreateWithoutActividadesInput, MomentoUncheckedCreateWithoutActividadesInput>
  }

  export type ProgresoActividadCreateWithoutActividadInput = {
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aprendiz: UserCreateNestedOneWithoutProgresoActividadesInput
  }

  export type ProgresoActividadUncheckedCreateWithoutActividadInput = {
    id?: number
    aprendizId: number
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgresoActividadCreateOrConnectWithoutActividadInput = {
    where: ProgresoActividadWhereUniqueInput
    create: XOR<ProgresoActividadCreateWithoutActividadInput, ProgresoActividadUncheckedCreateWithoutActividadInput>
  }

  export type ProgresoActividadCreateManyActividadInputEnvelope = {
    data: ProgresoActividadCreateManyActividadInput | ProgresoActividadCreateManyActividadInput[]
    skipDuplicates?: boolean
  }

  export type MomentoUpsertWithoutActividadesInput = {
    update: XOR<MomentoUpdateWithoutActividadesInput, MomentoUncheckedUpdateWithoutActividadesInput>
    create: XOR<MomentoCreateWithoutActividadesInput, MomentoUncheckedCreateWithoutActividadesInput>
    where?: MomentoWhereInput
  }

  export type MomentoUpdateToOneWithWhereWithoutActividadesInput = {
    where?: MomentoWhereInput
    data: XOR<MomentoUpdateWithoutActividadesInput, MomentoUncheckedUpdateWithoutActividadesInput>
  }

  export type MomentoUpdateWithoutActividadesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutMomentosNestedInput
  }

  export type MomentoUncheckedUpdateWithoutActividadesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    moduloId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadUpsertWithWhereUniqueWithoutActividadInput = {
    where: ProgresoActividadWhereUniqueInput
    update: XOR<ProgresoActividadUpdateWithoutActividadInput, ProgresoActividadUncheckedUpdateWithoutActividadInput>
    create: XOR<ProgresoActividadCreateWithoutActividadInput, ProgresoActividadUncheckedCreateWithoutActividadInput>
  }

  export type ProgresoActividadUpdateWithWhereUniqueWithoutActividadInput = {
    where: ProgresoActividadWhereUniqueInput
    data: XOR<ProgresoActividadUpdateWithoutActividadInput, ProgresoActividadUncheckedUpdateWithoutActividadInput>
  }

  export type ProgresoActividadUpdateManyWithWhereWithoutActividadInput = {
    where: ProgresoActividadScalarWhereInput
    data: XOR<ProgresoActividadUpdateManyMutationInput, ProgresoActividadUncheckedUpdateManyWithoutActividadInput>
  }

  export type UserCreateWithoutProgresoActividadesInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutProgresoActividadesInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutProgresoActividadesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgresoActividadesInput, UserUncheckedCreateWithoutProgresoActividadesInput>
  }

  export type ActividadCreateWithoutProgresosInput = {
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    momento: MomentoCreateNestedOneWithoutActividadesInput
  }

  export type ActividadUncheckedCreateWithoutProgresosInput = {
    id?: number
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    momentoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActividadCreateOrConnectWithoutProgresosInput = {
    where: ActividadWhereUniqueInput
    create: XOR<ActividadCreateWithoutProgresosInput, ActividadUncheckedCreateWithoutProgresosInput>
  }

  export type UserUpsertWithoutProgresoActividadesInput = {
    update: XOR<UserUpdateWithoutProgresoActividadesInput, UserUncheckedUpdateWithoutProgresoActividadesInput>
    create: XOR<UserCreateWithoutProgresoActividadesInput, UserUncheckedCreateWithoutProgresoActividadesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgresoActividadesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgresoActividadesInput, UserUncheckedUpdateWithoutProgresoActividadesInput>
  }

  export type UserUpdateWithoutProgresoActividadesInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutProgresoActividadesInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type ActividadUpsertWithoutProgresosInput = {
    update: XOR<ActividadUpdateWithoutProgresosInput, ActividadUncheckedUpdateWithoutProgresosInput>
    create: XOR<ActividadCreateWithoutProgresosInput, ActividadUncheckedCreateWithoutProgresosInput>
    where?: ActividadWhereInput
  }

  export type ActividadUpdateToOneWithWhereWithoutProgresosInput = {
    where?: ActividadWhereInput
    data: XOR<ActividadUpdateWithoutProgresosInput, ActividadUncheckedUpdateWithoutProgresosInput>
  }

  export type ActividadUpdateWithoutProgresosInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    momento?: MomentoUpdateOneRequiredWithoutActividadesNestedInput
  }

  export type ActividadUncheckedUpdateWithoutProgresosInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    momentoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutInsigniasInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutInsigniasInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutInsigniasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInsigniasInput, UserUncheckedCreateWithoutInsigniasInput>
  }

  export type UserUpsertWithoutInsigniasInput = {
    update: XOR<UserUpdateWithoutInsigniasInput, UserUncheckedUpdateWithoutInsigniasInput>
    create: XOR<UserCreateWithoutInsigniasInput, UserUncheckedCreateWithoutInsigniasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInsigniasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInsigniasInput, UserUncheckedUpdateWithoutInsigniasInput>
  }

  export type UserUpdateWithoutInsigniasInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutInsigniasInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type UserCreateWithoutTestResultadosInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutTestResultadosInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutTestResultadosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTestResultadosInput, UserUncheckedCreateWithoutTestResultadosInput>
  }

  export type UserUpsertWithoutTestResultadosInput = {
    update: XOR<UserUpdateWithoutTestResultadosInput, UserUncheckedUpdateWithoutTestResultadosInput>
    create: XOR<UserCreateWithoutTestResultadosInput, UserUncheckedCreateWithoutTestResultadosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTestResultadosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTestResultadosInput, UserUncheckedUpdateWithoutTestResultadosInput>
  }

  export type UserUpdateWithoutTestResultadosInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutTestResultadosInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type UserCreateWithoutInscripcionesInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutInscripcionesInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutInscripcionesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInscripcionesInput, UserUncheckedCreateWithoutInscripcionesInput>
  }

  export type CursoCreateWithoutInscripcionesInput = {
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instructor: UserCreateNestedOneWithoutCursosComoInstructorInput
    modulos?: ModuloCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutInscripcionesInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    instructorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    modulos?: ModuloUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutInscripcionesInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutInscripcionesInput, CursoUncheckedCreateWithoutInscripcionesInput>
  }

  export type UserUpsertWithoutInscripcionesInput = {
    update: XOR<UserUpdateWithoutInscripcionesInput, UserUncheckedUpdateWithoutInscripcionesInput>
    create: XOR<UserCreateWithoutInscripcionesInput, UserUncheckedCreateWithoutInscripcionesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInscripcionesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInscripcionesInput, UserUncheckedUpdateWithoutInscripcionesInput>
  }

  export type UserUpdateWithoutInscripcionesInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutInscripcionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type CursoUpsertWithoutInscripcionesInput = {
    update: XOR<CursoUpdateWithoutInscripcionesInput, CursoUncheckedUpdateWithoutInscripcionesInput>
    create: XOR<CursoCreateWithoutInscripcionesInput, CursoUncheckedCreateWithoutInscripcionesInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutInscripcionesInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutInscripcionesInput, CursoUncheckedUpdateWithoutInscripcionesInput>
  }

  export type CursoUpdateWithoutInscripcionesInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instructor?: UserUpdateOneRequiredWithoutCursosComoInstructorNestedInput
    modulos?: ModuloUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutInscripcionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    instructorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulos?: ModuloUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    notificaciones?: NotificacionCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    notificaciones?: NotificacionUncheckedCreateNestedManyWithoutDestinatarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    notificaciones?: NotificacionUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    notificaciones?: NotificacionUncheckedUpdateManyWithoutDestinatarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type UserCreateWithoutNotificacionesInput = {
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogCreateNestedManyWithoutUsuarioInput
    progresoActividades?: ProgresoActividadCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoCreateNestedManyWithoutAprendizInput
  }

  export type UserUncheckedCreateWithoutNotificacionesInput = {
    id?: number
    correo_usuario: string
    passw_usuario: string
    nombre_usuario?: string | null
    estado_usuario?: boolean
    rol_usuario: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cursosComoInstructor?: CursoUncheckedCreateNestedManyWithoutInstructorInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutAprendizInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUsuarioInput
    progresoActividades?: ProgresoActividadUncheckedCreateNestedManyWithoutAprendizInput
    insignias?: InsigniaAprendizUncheckedCreateNestedManyWithoutAprendizInput
    testResultados?: TestResultadoUncheckedCreateNestedManyWithoutAprendizInput
  }

  export type UserCreateOrConnectWithoutNotificacionesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificacionesInput, UserUncheckedCreateWithoutNotificacionesInput>
  }

  export type UserUpsertWithoutNotificacionesInput = {
    update: XOR<UserUpdateWithoutNotificacionesInput, UserUncheckedUpdateWithoutNotificacionesInput>
    create: XOR<UserCreateWithoutNotificacionesInput, UserUncheckedCreateWithoutNotificacionesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificacionesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificacionesInput, UserUncheckedUpdateWithoutNotificacionesInput>
  }

  export type UserUpdateWithoutNotificacionesInput = {
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUsuarioNestedInput
    progresoActividades?: ProgresoActividadUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUpdateManyWithoutAprendizNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    correo_usuario?: StringFieldUpdateOperationsInput | string
    passw_usuario?: StringFieldUpdateOperationsInput | string
    nombre_usuario?: NullableStringFieldUpdateOperationsInput | string | null
    estado_usuario?: BoolFieldUpdateOperationsInput | boolean
    rol_usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cursosComoInstructor?: CursoUncheckedUpdateManyWithoutInstructorNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutAprendizNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUsuarioNestedInput
    progresoActividades?: ProgresoActividadUncheckedUpdateManyWithoutAprendizNestedInput
    insignias?: InsigniaAprendizUncheckedUpdateManyWithoutAprendizNestedInput
    testResultados?: TestResultadoUncheckedUpdateManyWithoutAprendizNestedInput
  }

  export type CursoCreateManyInstructorInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    nivel?: string
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscripcionCreateManyAprendizInput = {
    id?: number
    cursoId: number
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUsuarioInput = {
    id?: number
    accion: string
    recurso: string
    recursoId?: number | null
    detalle?: string | null
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type NotificacionCreateManyDestinatarioInput = {
    id?: number
    tipo: string
    asunto: string
    mensaje: string
    leida?: boolean
    enviadoPorEmail?: boolean
    createdAt?: Date | string
  }

  export type ProgresoActividadCreateManyAprendizInput = {
    id?: number
    actividadId: number
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InsigniaAprendizCreateManyAprendizInput = {
    id?: number
    cursoId: number
    moduloId?: number | null
    tipo: string
    nombre: string
    descripcion?: string | null
    emoji?: string | null
    otorgadaAt?: Date | string
  }

  export type TestResultadoCreateManyAprendizInput = {
    id?: number
    cursoId: number
    tipo: string
    puntaje: number
    total: number
    correctas: number
    respuestas: JsonNullValueInput | InputJsonValue
    completadoAt?: Date | string
  }

  export type CursoUpdateWithoutInstructorInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulos?: ModuloUpdateManyWithoutCursoNestedInput
    inscripciones?: InscripcionUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulos?: ModuloUncheckedUpdateManyWithoutCursoNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateManyWithoutInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nivel?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUpdateWithoutAprendizInput = {
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutInscripcionesNestedInput
  }

  export type InscripcionUncheckedUpdateWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUncheckedUpdateManyWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUsuarioInput = {
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    accion?: StringFieldUpdateOperationsInput | string
    recurso?: StringFieldUpdateOperationsInput | string
    recursoId?: NullableIntFieldUpdateOperationsInput | number | null
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionUpdateWithoutDestinatarioInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionUncheckedUpdateWithoutDestinatarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacionUncheckedUpdateManyWithoutDestinatarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    asunto?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    leida?: BoolFieldUpdateOperationsInput | boolean
    enviadoPorEmail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadUpdateWithoutAprendizInput = {
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actividad?: ActividadUpdateOneRequiredWithoutProgresosNestedInput
  }

  export type ProgresoActividadUncheckedUpdateWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    actividadId?: IntFieldUpdateOperationsInput | number
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadUncheckedUpdateManyWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    actividadId?: IntFieldUpdateOperationsInput | number
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsigniaAprendizUpdateWithoutAprendizInput = {
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsigniaAprendizUncheckedUpdateWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsigniaAprendizUncheckedUpdateManyWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    moduloId?: NullableIntFieldUpdateOperationsInput | number | null
    tipo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    otorgadaAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultadoUpdateWithoutAprendizInput = {
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultadoUncheckedUpdateWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultadoUncheckedUpdateManyWithoutAprendizInput = {
    id?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    puntaje?: FloatFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    correctas?: IntFieldUpdateOperationsInput | number
    respuestas?: JsonNullValueInput | InputJsonValue
    completadoAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloCreateManyCursoInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    contenido?: string | null
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscripcionCreateManyCursoInput = {
    id?: number
    aprendizId: number
    progreso?: number
    estado?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloUpdateWithoutCursoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    momentos?: MomentoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    momentos?: MomentoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateManyWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUpdateWithoutCursoInput = {
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aprendiz?: UserUpdateOneRequiredWithoutInscripcionesNestedInput
  }

  export type InscripcionUncheckedUpdateWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUncheckedUpdateManyWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    progreso?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MomentoCreateManyModuloInput = {
    id?: number
    nombre: string
    tipo: string
    orden?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MomentoUpdateWithoutModuloInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actividades?: ActividadUpdateManyWithoutMomentoNestedInput
  }

  export type MomentoUncheckedUpdateWithoutModuloInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actividades?: ActividadUncheckedUpdateManyWithoutMomentoNestedInput
  }

  export type MomentoUncheckedUpdateManyWithoutModuloInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActividadCreateManyMomentoInput = {
    id?: number
    tipo: string
    titulo: string
    instrucciones?: string | null
    contenido: JsonNullValueInput | InputJsonValue
    orden?: number
    estado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActividadUpdateWithoutMomentoInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progresos?: ProgresoActividadUpdateManyWithoutActividadNestedInput
  }

  export type ActividadUncheckedUpdateWithoutMomentoInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progresos?: ProgresoActividadUncheckedUpdateManyWithoutActividadNestedInput
  }

  export type ActividadUncheckedUpdateManyWithoutMomentoInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    instrucciones?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    estado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadCreateManyActividadInput = {
    id?: number
    aprendizId: number
    completada?: boolean
    intentos?: number
    puntaje?: number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgresoActividadUpdateWithoutActividadInput = {
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aprendiz?: UserUpdateOneRequiredWithoutProgresoActividadesNestedInput
  }

  export type ProgresoActividadUncheckedUpdateWithoutActividadInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoActividadUncheckedUpdateManyWithoutActividadInput = {
    id?: IntFieldUpdateOperationsInput | number
    aprendizId?: IntFieldUpdateOperationsInput | number
    completada?: BoolFieldUpdateOperationsInput | boolean
    intentos?: IntFieldUpdateOperationsInput | number
    puntaje?: NullableFloatFieldUpdateOperationsInput | number | null
    respuesta?: NullableJsonNullValueInput | InputJsonValue
    completadoAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}