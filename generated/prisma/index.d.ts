
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model CustomerPlan
 * 
 */
export type CustomerPlan = $Result.DefaultSelection<Prisma.$CustomerPlanPayload>
/**
 * Model FinancialResponsible
 * 
 */
export type FinancialResponsible = $Result.DefaultSelection<Prisma.$FinancialResponsiblePayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model PortalPayment
 * 
 */
export type PortalPayment = $Result.DefaultSelection<Prisma.$PortalPaymentPayload>
/**
 * Model ChangeRequest
 * 
 */
export type ChangeRequest = $Result.DefaultSelection<Prisma.$ChangeRequestPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Phone
 * 
 */
export type Phone = $Result.DefaultSelection<Prisma.$PhonePayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const BoletoStatus: {
  ABERTO: 'ABERTO',
  QUITADO: 'QUITADO',
  VENCIDO: 'VENCIDO',
  CANCELADO: 'CANCELADO'
};

export type BoletoStatus = (typeof BoletoStatus)[keyof typeof BoletoStatus]


export const ChangeType: {
  ADDRESS: 'ADDRESS',
  PHONE: 'PHONE',
  PERSONAL: 'PERSONAL'
};

export type ChangeType = (typeof ChangeType)[keyof typeof ChangeType]


export const RequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type BoletoStatus = $Enums.BoletoStatus

export const BoletoStatus: typeof $Enums.BoletoStatus

export type ChangeType = $Enums.ChangeType

export const ChangeType: typeof $Enums.ChangeType

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerPlan`: Exposes CRUD operations for the **CustomerPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerPlans
    * const customerPlans = await prisma.customerPlan.findMany()
    * ```
    */
  get customerPlan(): Prisma.CustomerPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financialResponsible`: Exposes CRUD operations for the **FinancialResponsible** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinancialResponsibles
    * const financialResponsibles = await prisma.financialResponsible.findMany()
    * ```
    */
  get financialResponsible(): Prisma.FinancialResponsibleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portalPayment`: Exposes CRUD operations for the **PortalPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortalPayments
    * const portalPayments = await prisma.portalPayment.findMany()
    * ```
    */
  get portalPayment(): Prisma.PortalPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.changeRequest`: Exposes CRUD operations for the **ChangeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChangeRequests
    * const changeRequests = await prisma.changeRequest.findMany()
    * ```
    */
  get changeRequest(): Prisma.ChangeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.phone`: Exposes CRUD operations for the **Phone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Phones
    * const phones = await prisma.phone.findMany()
    * ```
    */
  get phone(): Prisma.PhoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
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
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Customer: 'Customer',
    CustomerPlan: 'CustomerPlan',
    FinancialResponsible: 'FinancialResponsible',
    Invoice: 'Invoice',
    PortalPayment: 'PortalPayment',
    ChangeRequest: 'ChangeRequest',
    Address: 'Address',
    Phone: 'Phone',
    RefreshToken: 'RefreshToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "customer" | "customerPlan" | "financialResponsible" | "invoice" | "portalPayment" | "changeRequest" | "address" | "phone" | "refreshToken"
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
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      CustomerPlan: {
        payload: Prisma.$CustomerPlanPayload<ExtArgs>
        fields: Prisma.CustomerPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>
          }
          findFirst: {
            args: Prisma.CustomerPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>
          }
          findMany: {
            args: Prisma.CustomerPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>[]
          }
          create: {
            args: Prisma.CustomerPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>
          }
          createMany: {
            args: Prisma.CustomerPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>[]
          }
          delete: {
            args: Prisma.CustomerPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>
          }
          update: {
            args: Prisma.CustomerPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>
          }
          deleteMany: {
            args: Prisma.CustomerPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>[]
          }
          upsert: {
            args: Prisma.CustomerPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPlanPayload>
          }
          aggregate: {
            args: Prisma.CustomerPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerPlan>
          }
          groupBy: {
            args: Prisma.CustomerPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerPlanCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerPlanCountAggregateOutputType> | number
          }
        }
      }
      FinancialResponsible: {
        payload: Prisma.$FinancialResponsiblePayload<ExtArgs>
        fields: Prisma.FinancialResponsibleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinancialResponsibleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinancialResponsibleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>
          }
          findFirst: {
            args: Prisma.FinancialResponsibleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinancialResponsibleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>
          }
          findMany: {
            args: Prisma.FinancialResponsibleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>[]
          }
          create: {
            args: Prisma.FinancialResponsibleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>
          }
          createMany: {
            args: Prisma.FinancialResponsibleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinancialResponsibleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>[]
          }
          delete: {
            args: Prisma.FinancialResponsibleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>
          }
          update: {
            args: Prisma.FinancialResponsibleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>
          }
          deleteMany: {
            args: Prisma.FinancialResponsibleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinancialResponsibleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FinancialResponsibleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>[]
          }
          upsert: {
            args: Prisma.FinancialResponsibleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialResponsiblePayload>
          }
          aggregate: {
            args: Prisma.FinancialResponsibleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinancialResponsible>
          }
          groupBy: {
            args: Prisma.FinancialResponsibleGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinancialResponsibleGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinancialResponsibleCountArgs<ExtArgs>
            result: $Utils.Optional<FinancialResponsibleCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      PortalPayment: {
        payload: Prisma.$PortalPaymentPayload<ExtArgs>
        fields: Prisma.PortalPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortalPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortalPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>
          }
          findFirst: {
            args: Prisma.PortalPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortalPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>
          }
          findMany: {
            args: Prisma.PortalPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>[]
          }
          create: {
            args: Prisma.PortalPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>
          }
          createMany: {
            args: Prisma.PortalPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortalPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>[]
          }
          delete: {
            args: Prisma.PortalPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>
          }
          update: {
            args: Prisma.PortalPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>
          }
          deleteMany: {
            args: Prisma.PortalPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortalPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortalPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>[]
          }
          upsert: {
            args: Prisma.PortalPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalPaymentPayload>
          }
          aggregate: {
            args: Prisma.PortalPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortalPayment>
          }
          groupBy: {
            args: Prisma.PortalPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortalPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortalPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PortalPaymentCountAggregateOutputType> | number
          }
        }
      }
      ChangeRequest: {
        payload: Prisma.$ChangeRequestPayload<ExtArgs>
        fields: Prisma.ChangeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChangeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChangeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          findFirst: {
            args: Prisma.ChangeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChangeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          findMany: {
            args: Prisma.ChangeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>[]
          }
          create: {
            args: Prisma.ChangeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          createMany: {
            args: Prisma.ChangeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChangeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>[]
          }
          delete: {
            args: Prisma.ChangeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          update: {
            args: Prisma.ChangeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          deleteMany: {
            args: Prisma.ChangeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChangeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChangeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>[]
          }
          upsert: {
            args: Prisma.ChangeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          aggregate: {
            args: Prisma.ChangeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChangeRequest>
          }
          groupBy: {
            args: Prisma.ChangeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChangeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChangeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ChangeRequestCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      Phone: {
        payload: Prisma.$PhonePayload<ExtArgs>
        fields: Prisma.PhoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>
          }
          findFirst: {
            args: Prisma.PhoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>
          }
          findMany: {
            args: Prisma.PhoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>[]
          }
          create: {
            args: Prisma.PhoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>
          }
          createMany: {
            args: Prisma.PhoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>[]
          }
          delete: {
            args: Prisma.PhoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>
          }
          update: {
            args: Prisma.PhoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>
          }
          deleteMany: {
            args: Prisma.PhoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>[]
          }
          upsert: {
            args: Prisma.PhoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonePayload>
          }
          aggregate: {
            args: Prisma.PhoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhone>
          }
          groupBy: {
            args: Prisma.PhoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhoneCountArgs<ExtArgs>
            result: $Utils.Optional<PhoneCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    customer?: CustomerOmit
    customerPlan?: CustomerPlanOmit
    financialResponsible?: FinancialResponsibleOmit
    invoice?: InvoiceOmit
    portalPayment?: PortalPaymentOmit
    changeRequest?: ChangeRequestOmit
    address?: AddressOmit
    phone?: PhoneOmit
    refreshToken?: RefreshTokenOmit
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
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
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
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    plans: number
    addresses: number
    phones: number
    payments: number
    changeRequests: number
    refreshTokens: number
    financialResponsibleAsPayer: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plans?: boolean | CustomerCountOutputTypeCountPlansArgs
    addresses?: boolean | CustomerCountOutputTypeCountAddressesArgs
    phones?: boolean | CustomerCountOutputTypeCountPhonesArgs
    payments?: boolean | CustomerCountOutputTypeCountPaymentsArgs
    changeRequests?: boolean | CustomerCountOutputTypeCountChangeRequestsArgs
    refreshTokens?: boolean | CustomerCountOutputTypeCountRefreshTokensArgs
    financialResponsibleAsPayer?: boolean | CustomerCountOutputTypeCountFinancialResponsibleAsPayerArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerPlanWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPhonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhoneWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalPaymentWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountChangeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeRequestWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountFinancialResponsibleAsPayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialResponsibleWhereInput
  }


  /**
   * Count Type CustomerPlanCountOutputType
   */

  export type CustomerPlanCountOutputType = {
    invoices: number
  }

  export type CustomerPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | CustomerPlanCountOutputTypeCountInvoicesArgs
  }

  // Custom InputTypes
  /**
   * CustomerPlanCountOutputType without action
   */
  export type CustomerPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlanCountOutputType
     */
    select?: CustomerPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerPlanCountOutputType without action
   */
  export type CustomerPlanCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }


  /**
   * Count Type InvoiceCountOutputType
   */

  export type InvoiceCountOutputType = {
    portalPayments: number
  }

  export type InvoiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portalPayments?: boolean | InvoiceCountOutputTypeCountPortalPaymentsArgs
  }

  // Custom InputTypes
  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceCountOutputType
     */
    select?: InvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountPortalPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalPaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    active: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    active: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    active: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    active?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    active?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    active?: true
    createdAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    active: boolean
    createdAt: Date
    _count: UserCountAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "active" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.Role
      active: boolean
      createdAt: Date
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
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
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
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    refresh_token_expires_in: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "refresh_token_expires_in", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      refresh_token_expires_in: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
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
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    id: number | null
  }

  export type CustomerSumAggregateOutputType = {
    id: bigint | null
  }

  export type CustomerMinAggregateOutputType = {
    id: bigint | null
    fullName: string | null
    cpfCnpj: string | null
    email: string | null
    passwordHash: string | null
    firstAccess: boolean | null
    asaasCustomerId: string | null
    lastSyncAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: bigint | null
    fullName: string | null
    cpfCnpj: string | null
    email: string | null
    passwordHash: string | null
    firstAccess: boolean | null
    asaasCustomerId: string | null
    lastSyncAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    fullName: number
    cpfCnpj: number
    email: number
    passwordHash: number
    firstAccess: number
    asaasCustomerId: number
    lastSyncAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    id?: true
  }

  export type CustomerSumAggregateInputType = {
    id?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    fullName?: true
    cpfCnpj?: true
    email?: true
    passwordHash?: true
    firstAccess?: true
    asaasCustomerId?: true
    lastSyncAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    fullName?: true
    cpfCnpj?: true
    email?: true
    passwordHash?: true
    firstAccess?: true
    asaasCustomerId?: true
    lastSyncAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    fullName?: true
    cpfCnpj?: true
    email?: true
    passwordHash?: true
    firstAccess?: true
    asaasCustomerId?: true
    lastSyncAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: bigint
    fullName: string
    cpfCnpj: string | null
    email: string | null
    passwordHash: string | null
    firstAccess: boolean
    asaasCustomerId: string | null
    lastSyncAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    cpfCnpj?: boolean
    email?: boolean
    passwordHash?: boolean
    firstAccess?: boolean
    asaasCustomerId?: boolean
    lastSyncAt?: boolean
    updatedAt?: boolean
    plans?: boolean | Customer$plansArgs<ExtArgs>
    addresses?: boolean | Customer$addressesArgs<ExtArgs>
    phones?: boolean | Customer$phonesArgs<ExtArgs>
    payments?: boolean | Customer$paymentsArgs<ExtArgs>
    changeRequests?: boolean | Customer$changeRequestsArgs<ExtArgs>
    refreshTokens?: boolean | Customer$refreshTokensArgs<ExtArgs>
    financialResponsibleAsPayer?: boolean | Customer$financialResponsibleAsPayerArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    cpfCnpj?: boolean
    email?: boolean
    passwordHash?: boolean
    firstAccess?: boolean
    asaasCustomerId?: boolean
    lastSyncAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    cpfCnpj?: boolean
    email?: boolean
    passwordHash?: boolean
    firstAccess?: boolean
    asaasCustomerId?: boolean
    lastSyncAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    fullName?: boolean
    cpfCnpj?: boolean
    email?: boolean
    passwordHash?: boolean
    firstAccess?: boolean
    asaasCustomerId?: boolean
    lastSyncAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "cpfCnpj" | "email" | "passwordHash" | "firstAccess" | "asaasCustomerId" | "lastSyncAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plans?: boolean | Customer$plansArgs<ExtArgs>
    addresses?: boolean | Customer$addressesArgs<ExtArgs>
    phones?: boolean | Customer$phonesArgs<ExtArgs>
    payments?: boolean | Customer$paymentsArgs<ExtArgs>
    changeRequests?: boolean | Customer$changeRequestsArgs<ExtArgs>
    refreshTokens?: boolean | Customer$refreshTokensArgs<ExtArgs>
    financialResponsibleAsPayer?: boolean | Customer$financialResponsibleAsPayerArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      plans: Prisma.$CustomerPlanPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      phones: Prisma.$PhonePayload<ExtArgs>[]
      payments: Prisma.$PortalPaymentPayload<ExtArgs>[]
      changeRequests: Prisma.$ChangeRequestPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      financialResponsibleAsPayer: Prisma.$FinancialResponsiblePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      fullName: string
      cpfCnpj: string | null
      email: string | null
      passwordHash: string | null
      firstAccess: boolean
      asaasCustomerId: string | null
      lastSyncAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plans<T extends Customer$plansArgs<ExtArgs> = {}>(args?: Subset<T, Customer$plansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends Customer$addressesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    phones<T extends Customer$phonesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$phonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Customer$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    changeRequests<T extends Customer$changeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$changeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends Customer$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, Customer$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    financialResponsibleAsPayer<T extends Customer$financialResponsibleAsPayerArgs<ExtArgs> = {}>(args?: Subset<T, Customer$financialResponsibleAsPayerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'BigInt'>
    readonly fullName: FieldRef<"Customer", 'String'>
    readonly cpfCnpj: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly passwordHash: FieldRef<"Customer", 'String'>
    readonly firstAccess: FieldRef<"Customer", 'Boolean'>
    readonly asaasCustomerId: FieldRef<"Customer", 'String'>
    readonly lastSyncAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.plans
   */
  export type Customer$plansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    where?: CustomerPlanWhereInput
    orderBy?: CustomerPlanOrderByWithRelationInput | CustomerPlanOrderByWithRelationInput[]
    cursor?: CustomerPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerPlanScalarFieldEnum | CustomerPlanScalarFieldEnum[]
  }

  /**
   * Customer.addresses
   */
  export type Customer$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Customer.phones
   */
  export type Customer$phonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    where?: PhoneWhereInput
    orderBy?: PhoneOrderByWithRelationInput | PhoneOrderByWithRelationInput[]
    cursor?: PhoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhoneScalarFieldEnum | PhoneScalarFieldEnum[]
  }

  /**
   * Customer.payments
   */
  export type Customer$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    where?: PortalPaymentWhereInput
    orderBy?: PortalPaymentOrderByWithRelationInput | PortalPaymentOrderByWithRelationInput[]
    cursor?: PortalPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortalPaymentScalarFieldEnum | PortalPaymentScalarFieldEnum[]
  }

  /**
   * Customer.changeRequests
   */
  export type Customer$changeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    where?: ChangeRequestWhereInput
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    cursor?: ChangeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * Customer.refreshTokens
   */
  export type Customer$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * Customer.financialResponsibleAsPayer
   */
  export type Customer$financialResponsibleAsPayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    where?: FinancialResponsibleWhereInput
    orderBy?: FinancialResponsibleOrderByWithRelationInput | FinancialResponsibleOrderByWithRelationInput[]
    cursor?: FinancialResponsibleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinancialResponsibleScalarFieldEnum | FinancialResponsibleScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model CustomerPlan
   */

  export type AggregateCustomerPlan = {
    _count: CustomerPlanCountAggregateOutputType | null
    _avg: CustomerPlanAvgAggregateOutputType | null
    _sum: CustomerPlanSumAggregateOutputType | null
    _min: CustomerPlanMinAggregateOutputType | null
    _max: CustomerPlanMaxAggregateOutputType | null
  }

  export type CustomerPlanAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type CustomerPlanSumAggregateOutputType = {
    id: bigint | null
    customerId: bigint | null
  }

  export type CustomerPlanMinAggregateOutputType = {
    id: bigint | null
    customerId: bigint | null
    status: string | null
    hasFinancialResp: boolean | null
    sector: string | null
    quadra: string | null
    lote: string | null
  }

  export type CustomerPlanMaxAggregateOutputType = {
    id: bigint | null
    customerId: bigint | null
    status: string | null
    hasFinancialResp: boolean | null
    sector: string | null
    quadra: string | null
    lote: string | null
  }

  export type CustomerPlanCountAggregateOutputType = {
    id: number
    customerId: number
    status: number
    hasFinancialResp: number
    sector: number
    quadra: number
    lote: number
    _all: number
  }


  export type CustomerPlanAvgAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type CustomerPlanSumAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type CustomerPlanMinAggregateInputType = {
    id?: true
    customerId?: true
    status?: true
    hasFinancialResp?: true
    sector?: true
    quadra?: true
    lote?: true
  }

  export type CustomerPlanMaxAggregateInputType = {
    id?: true
    customerId?: true
    status?: true
    hasFinancialResp?: true
    sector?: true
    quadra?: true
    lote?: true
  }

  export type CustomerPlanCountAggregateInputType = {
    id?: true
    customerId?: true
    status?: true
    hasFinancialResp?: true
    sector?: true
    quadra?: true
    lote?: true
    _all?: true
  }

  export type CustomerPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerPlan to aggregate.
     */
    where?: CustomerPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPlans to fetch.
     */
    orderBy?: CustomerPlanOrderByWithRelationInput | CustomerPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerPlans
    **/
    _count?: true | CustomerPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerPlanMaxAggregateInputType
  }

  export type GetCustomerPlanAggregateType<T extends CustomerPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerPlan[P]>
      : GetScalarType<T[P], AggregateCustomerPlan[P]>
  }




  export type CustomerPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerPlanWhereInput
    orderBy?: CustomerPlanOrderByWithAggregationInput | CustomerPlanOrderByWithAggregationInput[]
    by: CustomerPlanScalarFieldEnum[] | CustomerPlanScalarFieldEnum
    having?: CustomerPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerPlanCountAggregateInputType | true
    _avg?: CustomerPlanAvgAggregateInputType
    _sum?: CustomerPlanSumAggregateInputType
    _min?: CustomerPlanMinAggregateInputType
    _max?: CustomerPlanMaxAggregateInputType
  }

  export type CustomerPlanGroupByOutputType = {
    id: bigint
    customerId: bigint
    status: string | null
    hasFinancialResp: boolean
    sector: string | null
    quadra: string | null
    lote: string | null
    _count: CustomerPlanCountAggregateOutputType | null
    _avg: CustomerPlanAvgAggregateOutputType | null
    _sum: CustomerPlanSumAggregateOutputType | null
    _min: CustomerPlanMinAggregateOutputType | null
    _max: CustomerPlanMaxAggregateOutputType | null
  }

  type GetCustomerPlanGroupByPayload<T extends CustomerPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerPlanGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerPlanGroupByOutputType[P]>
        }
      >
    >


  export type CustomerPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    status?: boolean
    hasFinancialResp?: boolean
    sector?: boolean
    quadra?: boolean
    lote?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    financialResponsible?: boolean | CustomerPlan$financialResponsibleArgs<ExtArgs>
    invoices?: boolean | CustomerPlan$invoicesArgs<ExtArgs>
    _count?: boolean | CustomerPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerPlan"]>

  export type CustomerPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    status?: boolean
    hasFinancialResp?: boolean
    sector?: boolean
    quadra?: boolean
    lote?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerPlan"]>

  export type CustomerPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    status?: boolean
    hasFinancialResp?: boolean
    sector?: boolean
    quadra?: boolean
    lote?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerPlan"]>

  export type CustomerPlanSelectScalar = {
    id?: boolean
    customerId?: boolean
    status?: boolean
    hasFinancialResp?: boolean
    sector?: boolean
    quadra?: boolean
    lote?: boolean
  }

  export type CustomerPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "status" | "hasFinancialResp" | "sector" | "quadra" | "lote", ExtArgs["result"]["customerPlan"]>
  export type CustomerPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    financialResponsible?: boolean | CustomerPlan$financialResponsibleArgs<ExtArgs>
    invoices?: boolean | CustomerPlan$invoicesArgs<ExtArgs>
    _count?: boolean | CustomerPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CustomerPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerPlan"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      financialResponsible: Prisma.$FinancialResponsiblePayload<ExtArgs> | null
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      customerId: bigint
      status: string | null
      hasFinancialResp: boolean
      sector: string | null
      quadra: string | null
      lote: string | null
    }, ExtArgs["result"]["customerPlan"]>
    composites: {}
  }

  type CustomerPlanGetPayload<S extends boolean | null | undefined | CustomerPlanDefaultArgs> = $Result.GetResult<Prisma.$CustomerPlanPayload, S>

  type CustomerPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerPlanCountAggregateInputType | true
    }

  export interface CustomerPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerPlan'], meta: { name: 'CustomerPlan' } }
    /**
     * Find zero or one CustomerPlan that matches the filter.
     * @param {CustomerPlanFindUniqueArgs} args - Arguments to find a CustomerPlan
     * @example
     * // Get one CustomerPlan
     * const customerPlan = await prisma.customerPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerPlanFindUniqueArgs>(args: SelectSubset<T, CustomerPlanFindUniqueArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerPlanFindUniqueOrThrowArgs} args - Arguments to find a CustomerPlan
     * @example
     * // Get one CustomerPlan
     * const customerPlan = await prisma.customerPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanFindFirstArgs} args - Arguments to find a CustomerPlan
     * @example
     * // Get one CustomerPlan
     * const customerPlan = await prisma.customerPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerPlanFindFirstArgs>(args?: SelectSubset<T, CustomerPlanFindFirstArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanFindFirstOrThrowArgs} args - Arguments to find a CustomerPlan
     * @example
     * // Get one CustomerPlan
     * const customerPlan = await prisma.customerPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerPlans
     * const customerPlans = await prisma.customerPlan.findMany()
     * 
     * // Get first 10 CustomerPlans
     * const customerPlans = await prisma.customerPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerPlanWithIdOnly = await prisma.customerPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerPlanFindManyArgs>(args?: SelectSubset<T, CustomerPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerPlan.
     * @param {CustomerPlanCreateArgs} args - Arguments to create a CustomerPlan.
     * @example
     * // Create one CustomerPlan
     * const CustomerPlan = await prisma.customerPlan.create({
     *   data: {
     *     // ... data to create a CustomerPlan
     *   }
     * })
     * 
     */
    create<T extends CustomerPlanCreateArgs>(args: SelectSubset<T, CustomerPlanCreateArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerPlans.
     * @param {CustomerPlanCreateManyArgs} args - Arguments to create many CustomerPlans.
     * @example
     * // Create many CustomerPlans
     * const customerPlan = await prisma.customerPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerPlanCreateManyArgs>(args?: SelectSubset<T, CustomerPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerPlans and returns the data saved in the database.
     * @param {CustomerPlanCreateManyAndReturnArgs} args - Arguments to create many CustomerPlans.
     * @example
     * // Create many CustomerPlans
     * const customerPlan = await prisma.customerPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerPlans and only return the `id`
     * const customerPlanWithIdOnly = await prisma.customerPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerPlan.
     * @param {CustomerPlanDeleteArgs} args - Arguments to delete one CustomerPlan.
     * @example
     * // Delete one CustomerPlan
     * const CustomerPlan = await prisma.customerPlan.delete({
     *   where: {
     *     // ... filter to delete one CustomerPlan
     *   }
     * })
     * 
     */
    delete<T extends CustomerPlanDeleteArgs>(args: SelectSubset<T, CustomerPlanDeleteArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerPlan.
     * @param {CustomerPlanUpdateArgs} args - Arguments to update one CustomerPlan.
     * @example
     * // Update one CustomerPlan
     * const customerPlan = await prisma.customerPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerPlanUpdateArgs>(args: SelectSubset<T, CustomerPlanUpdateArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerPlans.
     * @param {CustomerPlanDeleteManyArgs} args - Arguments to filter CustomerPlans to delete.
     * @example
     * // Delete a few CustomerPlans
     * const { count } = await prisma.customerPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerPlanDeleteManyArgs>(args?: SelectSubset<T, CustomerPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerPlans
     * const customerPlan = await prisma.customerPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerPlanUpdateManyArgs>(args: SelectSubset<T, CustomerPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerPlans and returns the data updated in the database.
     * @param {CustomerPlanUpdateManyAndReturnArgs} args - Arguments to update many CustomerPlans.
     * @example
     * // Update many CustomerPlans
     * const customerPlan = await prisma.customerPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerPlans and only return the `id`
     * const customerPlanWithIdOnly = await prisma.customerPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerPlan.
     * @param {CustomerPlanUpsertArgs} args - Arguments to update or create a CustomerPlan.
     * @example
     * // Update or create a CustomerPlan
     * const customerPlan = await prisma.customerPlan.upsert({
     *   create: {
     *     // ... data to create a CustomerPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerPlan we want to update
     *   }
     * })
     */
    upsert<T extends CustomerPlanUpsertArgs>(args: SelectSubset<T, CustomerPlanUpsertArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanCountArgs} args - Arguments to filter CustomerPlans to count.
     * @example
     * // Count the number of CustomerPlans
     * const count = await prisma.customerPlan.count({
     *   where: {
     *     // ... the filter for the CustomerPlans we want to count
     *   }
     * })
    **/
    count<T extends CustomerPlanCountArgs>(
      args?: Subset<T, CustomerPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerPlanAggregateArgs>(args: Subset<T, CustomerPlanAggregateArgs>): Prisma.PrismaPromise<GetCustomerPlanAggregateType<T>>

    /**
     * Group by CustomerPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPlanGroupByArgs} args - Group by arguments.
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
      T extends CustomerPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerPlanGroupByArgs['orderBy'] }
        : { orderBy?: CustomerPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerPlan model
   */
  readonly fields: CustomerPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    financialResponsible<T extends CustomerPlan$financialResponsibleArgs<ExtArgs> = {}>(args?: Subset<T, CustomerPlan$financialResponsibleArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    invoices<T extends CustomerPlan$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, CustomerPlan$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CustomerPlan model
   */
  interface CustomerPlanFieldRefs {
    readonly id: FieldRef<"CustomerPlan", 'BigInt'>
    readonly customerId: FieldRef<"CustomerPlan", 'BigInt'>
    readonly status: FieldRef<"CustomerPlan", 'String'>
    readonly hasFinancialResp: FieldRef<"CustomerPlan", 'Boolean'>
    readonly sector: FieldRef<"CustomerPlan", 'String'>
    readonly quadra: FieldRef<"CustomerPlan", 'String'>
    readonly lote: FieldRef<"CustomerPlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CustomerPlan findUnique
   */
  export type CustomerPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPlan to fetch.
     */
    where: CustomerPlanWhereUniqueInput
  }

  /**
   * CustomerPlan findUniqueOrThrow
   */
  export type CustomerPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPlan to fetch.
     */
    where: CustomerPlanWhereUniqueInput
  }

  /**
   * CustomerPlan findFirst
   */
  export type CustomerPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPlan to fetch.
     */
    where?: CustomerPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPlans to fetch.
     */
    orderBy?: CustomerPlanOrderByWithRelationInput | CustomerPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerPlans.
     */
    cursor?: CustomerPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerPlans.
     */
    distinct?: CustomerPlanScalarFieldEnum | CustomerPlanScalarFieldEnum[]
  }

  /**
   * CustomerPlan findFirstOrThrow
   */
  export type CustomerPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPlan to fetch.
     */
    where?: CustomerPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPlans to fetch.
     */
    orderBy?: CustomerPlanOrderByWithRelationInput | CustomerPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerPlans.
     */
    cursor?: CustomerPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerPlans.
     */
    distinct?: CustomerPlanScalarFieldEnum | CustomerPlanScalarFieldEnum[]
  }

  /**
   * CustomerPlan findMany
   */
  export type CustomerPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPlans to fetch.
     */
    where?: CustomerPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPlans to fetch.
     */
    orderBy?: CustomerPlanOrderByWithRelationInput | CustomerPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerPlans.
     */
    cursor?: CustomerPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPlans.
     */
    skip?: number
    distinct?: CustomerPlanScalarFieldEnum | CustomerPlanScalarFieldEnum[]
  }

  /**
   * CustomerPlan create
   */
  export type CustomerPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerPlan.
     */
    data: XOR<CustomerPlanCreateInput, CustomerPlanUncheckedCreateInput>
  }

  /**
   * CustomerPlan createMany
   */
  export type CustomerPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerPlans.
     */
    data: CustomerPlanCreateManyInput | CustomerPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerPlan createManyAndReturn
   */
  export type CustomerPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerPlans.
     */
    data: CustomerPlanCreateManyInput | CustomerPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerPlan update
   */
  export type CustomerPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerPlan.
     */
    data: XOR<CustomerPlanUpdateInput, CustomerPlanUncheckedUpdateInput>
    /**
     * Choose, which CustomerPlan to update.
     */
    where: CustomerPlanWhereUniqueInput
  }

  /**
   * CustomerPlan updateMany
   */
  export type CustomerPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerPlans.
     */
    data: XOR<CustomerPlanUpdateManyMutationInput, CustomerPlanUncheckedUpdateManyInput>
    /**
     * Filter which CustomerPlans to update
     */
    where?: CustomerPlanWhereInput
    /**
     * Limit how many CustomerPlans to update.
     */
    limit?: number
  }

  /**
   * CustomerPlan updateManyAndReturn
   */
  export type CustomerPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * The data used to update CustomerPlans.
     */
    data: XOR<CustomerPlanUpdateManyMutationInput, CustomerPlanUncheckedUpdateManyInput>
    /**
     * Filter which CustomerPlans to update
     */
    where?: CustomerPlanWhereInput
    /**
     * Limit how many CustomerPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerPlan upsert
   */
  export type CustomerPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerPlan to update in case it exists.
     */
    where: CustomerPlanWhereUniqueInput
    /**
     * In case the CustomerPlan found by the `where` argument doesn't exist, create a new CustomerPlan with this data.
     */
    create: XOR<CustomerPlanCreateInput, CustomerPlanUncheckedCreateInput>
    /**
     * In case the CustomerPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerPlanUpdateInput, CustomerPlanUncheckedUpdateInput>
  }

  /**
   * CustomerPlan delete
   */
  export type CustomerPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
    /**
     * Filter which CustomerPlan to delete.
     */
    where: CustomerPlanWhereUniqueInput
  }

  /**
   * CustomerPlan deleteMany
   */
  export type CustomerPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerPlans to delete
     */
    where?: CustomerPlanWhereInput
    /**
     * Limit how many CustomerPlans to delete.
     */
    limit?: number
  }

  /**
   * CustomerPlan.financialResponsible
   */
  export type CustomerPlan$financialResponsibleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    where?: FinancialResponsibleWhereInput
  }

  /**
   * CustomerPlan.invoices
   */
  export type CustomerPlan$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * CustomerPlan without action
   */
  export type CustomerPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPlan
     */
    select?: CustomerPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPlan
     */
    omit?: CustomerPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPlanInclude<ExtArgs> | null
  }


  /**
   * Model FinancialResponsible
   */

  export type AggregateFinancialResponsible = {
    _count: FinancialResponsibleCountAggregateOutputType | null
    _avg: FinancialResponsibleAvgAggregateOutputType | null
    _sum: FinancialResponsibleSumAggregateOutputType | null
    _min: FinancialResponsibleMinAggregateOutputType | null
    _max: FinancialResponsibleMaxAggregateOutputType | null
  }

  export type FinancialResponsibleAvgAggregateOutputType = {
    id: number | null
    customerPlanId: number | null
    payerCustomerId: number | null
  }

  export type FinancialResponsibleSumAggregateOutputType = {
    id: bigint | null
    customerPlanId: bigint | null
    payerCustomerId: bigint | null
  }

  export type FinancialResponsibleMinAggregateOutputType = {
    id: bigint | null
    customerPlanId: bigint | null
    name: string | null
    cpfCnpj: string | null
    email: string | null
    phone: string | null
    payerCustomerId: bigint | null
  }

  export type FinancialResponsibleMaxAggregateOutputType = {
    id: bigint | null
    customerPlanId: bigint | null
    name: string | null
    cpfCnpj: string | null
    email: string | null
    phone: string | null
    payerCustomerId: bigint | null
  }

  export type FinancialResponsibleCountAggregateOutputType = {
    id: number
    customerPlanId: number
    name: number
    cpfCnpj: number
    email: number
    phone: number
    payerCustomerId: number
    _all: number
  }


  export type FinancialResponsibleAvgAggregateInputType = {
    id?: true
    customerPlanId?: true
    payerCustomerId?: true
  }

  export type FinancialResponsibleSumAggregateInputType = {
    id?: true
    customerPlanId?: true
    payerCustomerId?: true
  }

  export type FinancialResponsibleMinAggregateInputType = {
    id?: true
    customerPlanId?: true
    name?: true
    cpfCnpj?: true
    email?: true
    phone?: true
    payerCustomerId?: true
  }

  export type FinancialResponsibleMaxAggregateInputType = {
    id?: true
    customerPlanId?: true
    name?: true
    cpfCnpj?: true
    email?: true
    phone?: true
    payerCustomerId?: true
  }

  export type FinancialResponsibleCountAggregateInputType = {
    id?: true
    customerPlanId?: true
    name?: true
    cpfCnpj?: true
    email?: true
    phone?: true
    payerCustomerId?: true
    _all?: true
  }

  export type FinancialResponsibleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialResponsible to aggregate.
     */
    where?: FinancialResponsibleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialResponsibles to fetch.
     */
    orderBy?: FinancialResponsibleOrderByWithRelationInput | FinancialResponsibleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinancialResponsibleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialResponsibles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialResponsibles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinancialResponsibles
    **/
    _count?: true | FinancialResponsibleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinancialResponsibleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinancialResponsibleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinancialResponsibleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinancialResponsibleMaxAggregateInputType
  }

  export type GetFinancialResponsibleAggregateType<T extends FinancialResponsibleAggregateArgs> = {
        [P in keyof T & keyof AggregateFinancialResponsible]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinancialResponsible[P]>
      : GetScalarType<T[P], AggregateFinancialResponsible[P]>
  }




  export type FinancialResponsibleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialResponsibleWhereInput
    orderBy?: FinancialResponsibleOrderByWithAggregationInput | FinancialResponsibleOrderByWithAggregationInput[]
    by: FinancialResponsibleScalarFieldEnum[] | FinancialResponsibleScalarFieldEnum
    having?: FinancialResponsibleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinancialResponsibleCountAggregateInputType | true
    _avg?: FinancialResponsibleAvgAggregateInputType
    _sum?: FinancialResponsibleSumAggregateInputType
    _min?: FinancialResponsibleMinAggregateInputType
    _max?: FinancialResponsibleMaxAggregateInputType
  }

  export type FinancialResponsibleGroupByOutputType = {
    id: bigint
    customerPlanId: bigint
    name: string
    cpfCnpj: string
    email: string | null
    phone: string | null
    payerCustomerId: bigint | null
    _count: FinancialResponsibleCountAggregateOutputType | null
    _avg: FinancialResponsibleAvgAggregateOutputType | null
    _sum: FinancialResponsibleSumAggregateOutputType | null
    _min: FinancialResponsibleMinAggregateOutputType | null
    _max: FinancialResponsibleMaxAggregateOutputType | null
  }

  type GetFinancialResponsibleGroupByPayload<T extends FinancialResponsibleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinancialResponsibleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinancialResponsibleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinancialResponsibleGroupByOutputType[P]>
            : GetScalarType<T[P], FinancialResponsibleGroupByOutputType[P]>
        }
      >
    >


  export type FinancialResponsibleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerPlanId?: boolean
    name?: boolean
    cpfCnpj?: boolean
    email?: boolean
    phone?: boolean
    payerCustomerId?: boolean
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    payer?: boolean | FinancialResponsible$payerArgs<ExtArgs>
  }, ExtArgs["result"]["financialResponsible"]>

  export type FinancialResponsibleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerPlanId?: boolean
    name?: boolean
    cpfCnpj?: boolean
    email?: boolean
    phone?: boolean
    payerCustomerId?: boolean
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    payer?: boolean | FinancialResponsible$payerArgs<ExtArgs>
  }, ExtArgs["result"]["financialResponsible"]>

  export type FinancialResponsibleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerPlanId?: boolean
    name?: boolean
    cpfCnpj?: boolean
    email?: boolean
    phone?: boolean
    payerCustomerId?: boolean
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    payer?: boolean | FinancialResponsible$payerArgs<ExtArgs>
  }, ExtArgs["result"]["financialResponsible"]>

  export type FinancialResponsibleSelectScalar = {
    id?: boolean
    customerPlanId?: boolean
    name?: boolean
    cpfCnpj?: boolean
    email?: boolean
    phone?: boolean
    payerCustomerId?: boolean
  }

  export type FinancialResponsibleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerPlanId" | "name" | "cpfCnpj" | "email" | "phone" | "payerCustomerId", ExtArgs["result"]["financialResponsible"]>
  export type FinancialResponsibleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    payer?: boolean | FinancialResponsible$payerArgs<ExtArgs>
  }
  export type FinancialResponsibleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    payer?: boolean | FinancialResponsible$payerArgs<ExtArgs>
  }
  export type FinancialResponsibleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    payer?: boolean | FinancialResponsible$payerArgs<ExtArgs>
  }

  export type $FinancialResponsiblePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinancialResponsible"
    objects: {
      plan: Prisma.$CustomerPlanPayload<ExtArgs>
      payer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      customerPlanId: bigint
      name: string
      cpfCnpj: string
      email: string | null
      phone: string | null
      payerCustomerId: bigint | null
    }, ExtArgs["result"]["financialResponsible"]>
    composites: {}
  }

  type FinancialResponsibleGetPayload<S extends boolean | null | undefined | FinancialResponsibleDefaultArgs> = $Result.GetResult<Prisma.$FinancialResponsiblePayload, S>

  type FinancialResponsibleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinancialResponsibleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinancialResponsibleCountAggregateInputType | true
    }

  export interface FinancialResponsibleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinancialResponsible'], meta: { name: 'FinancialResponsible' } }
    /**
     * Find zero or one FinancialResponsible that matches the filter.
     * @param {FinancialResponsibleFindUniqueArgs} args - Arguments to find a FinancialResponsible
     * @example
     * // Get one FinancialResponsible
     * const financialResponsible = await prisma.financialResponsible.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancialResponsibleFindUniqueArgs>(args: SelectSubset<T, FinancialResponsibleFindUniqueArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FinancialResponsible that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancialResponsibleFindUniqueOrThrowArgs} args - Arguments to find a FinancialResponsible
     * @example
     * // Get one FinancialResponsible
     * const financialResponsible = await prisma.financialResponsible.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancialResponsibleFindUniqueOrThrowArgs>(args: SelectSubset<T, FinancialResponsibleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialResponsible that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleFindFirstArgs} args - Arguments to find a FinancialResponsible
     * @example
     * // Get one FinancialResponsible
     * const financialResponsible = await prisma.financialResponsible.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancialResponsibleFindFirstArgs>(args?: SelectSubset<T, FinancialResponsibleFindFirstArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialResponsible that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleFindFirstOrThrowArgs} args - Arguments to find a FinancialResponsible
     * @example
     * // Get one FinancialResponsible
     * const financialResponsible = await prisma.financialResponsible.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancialResponsibleFindFirstOrThrowArgs>(args?: SelectSubset<T, FinancialResponsibleFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FinancialResponsibles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinancialResponsibles
     * const financialResponsibles = await prisma.financialResponsible.findMany()
     * 
     * // Get first 10 FinancialResponsibles
     * const financialResponsibles = await prisma.financialResponsible.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financialResponsibleWithIdOnly = await prisma.financialResponsible.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinancialResponsibleFindManyArgs>(args?: SelectSubset<T, FinancialResponsibleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FinancialResponsible.
     * @param {FinancialResponsibleCreateArgs} args - Arguments to create a FinancialResponsible.
     * @example
     * // Create one FinancialResponsible
     * const FinancialResponsible = await prisma.financialResponsible.create({
     *   data: {
     *     // ... data to create a FinancialResponsible
     *   }
     * })
     * 
     */
    create<T extends FinancialResponsibleCreateArgs>(args: SelectSubset<T, FinancialResponsibleCreateArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FinancialResponsibles.
     * @param {FinancialResponsibleCreateManyArgs} args - Arguments to create many FinancialResponsibles.
     * @example
     * // Create many FinancialResponsibles
     * const financialResponsible = await prisma.financialResponsible.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinancialResponsibleCreateManyArgs>(args?: SelectSubset<T, FinancialResponsibleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinancialResponsibles and returns the data saved in the database.
     * @param {FinancialResponsibleCreateManyAndReturnArgs} args - Arguments to create many FinancialResponsibles.
     * @example
     * // Create many FinancialResponsibles
     * const financialResponsible = await prisma.financialResponsible.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinancialResponsibles and only return the `id`
     * const financialResponsibleWithIdOnly = await prisma.financialResponsible.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinancialResponsibleCreateManyAndReturnArgs>(args?: SelectSubset<T, FinancialResponsibleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FinancialResponsible.
     * @param {FinancialResponsibleDeleteArgs} args - Arguments to delete one FinancialResponsible.
     * @example
     * // Delete one FinancialResponsible
     * const FinancialResponsible = await prisma.financialResponsible.delete({
     *   where: {
     *     // ... filter to delete one FinancialResponsible
     *   }
     * })
     * 
     */
    delete<T extends FinancialResponsibleDeleteArgs>(args: SelectSubset<T, FinancialResponsibleDeleteArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FinancialResponsible.
     * @param {FinancialResponsibleUpdateArgs} args - Arguments to update one FinancialResponsible.
     * @example
     * // Update one FinancialResponsible
     * const financialResponsible = await prisma.financialResponsible.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinancialResponsibleUpdateArgs>(args: SelectSubset<T, FinancialResponsibleUpdateArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FinancialResponsibles.
     * @param {FinancialResponsibleDeleteManyArgs} args - Arguments to filter FinancialResponsibles to delete.
     * @example
     * // Delete a few FinancialResponsibles
     * const { count } = await prisma.financialResponsible.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinancialResponsibleDeleteManyArgs>(args?: SelectSubset<T, FinancialResponsibleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialResponsibles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinancialResponsibles
     * const financialResponsible = await prisma.financialResponsible.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinancialResponsibleUpdateManyArgs>(args: SelectSubset<T, FinancialResponsibleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialResponsibles and returns the data updated in the database.
     * @param {FinancialResponsibleUpdateManyAndReturnArgs} args - Arguments to update many FinancialResponsibles.
     * @example
     * // Update many FinancialResponsibles
     * const financialResponsible = await prisma.financialResponsible.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FinancialResponsibles and only return the `id`
     * const financialResponsibleWithIdOnly = await prisma.financialResponsible.updateManyAndReturn({
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
    updateManyAndReturn<T extends FinancialResponsibleUpdateManyAndReturnArgs>(args: SelectSubset<T, FinancialResponsibleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FinancialResponsible.
     * @param {FinancialResponsibleUpsertArgs} args - Arguments to update or create a FinancialResponsible.
     * @example
     * // Update or create a FinancialResponsible
     * const financialResponsible = await prisma.financialResponsible.upsert({
     *   create: {
     *     // ... data to create a FinancialResponsible
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinancialResponsible we want to update
     *   }
     * })
     */
    upsert<T extends FinancialResponsibleUpsertArgs>(args: SelectSubset<T, FinancialResponsibleUpsertArgs<ExtArgs>>): Prisma__FinancialResponsibleClient<$Result.GetResult<Prisma.$FinancialResponsiblePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FinancialResponsibles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleCountArgs} args - Arguments to filter FinancialResponsibles to count.
     * @example
     * // Count the number of FinancialResponsibles
     * const count = await prisma.financialResponsible.count({
     *   where: {
     *     // ... the filter for the FinancialResponsibles we want to count
     *   }
     * })
    **/
    count<T extends FinancialResponsibleCountArgs>(
      args?: Subset<T, FinancialResponsibleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinancialResponsibleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinancialResponsible.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FinancialResponsibleAggregateArgs>(args: Subset<T, FinancialResponsibleAggregateArgs>): Prisma.PrismaPromise<GetFinancialResponsibleAggregateType<T>>

    /**
     * Group by FinancialResponsible.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialResponsibleGroupByArgs} args - Group by arguments.
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
      T extends FinancialResponsibleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinancialResponsibleGroupByArgs['orderBy'] }
        : { orderBy?: FinancialResponsibleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FinancialResponsibleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialResponsibleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinancialResponsible model
   */
  readonly fields: FinancialResponsibleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinancialResponsible.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinancialResponsibleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends CustomerPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerPlanDefaultArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payer<T extends FinancialResponsible$payerArgs<ExtArgs> = {}>(args?: Subset<T, FinancialResponsible$payerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FinancialResponsible model
   */
  interface FinancialResponsibleFieldRefs {
    readonly id: FieldRef<"FinancialResponsible", 'BigInt'>
    readonly customerPlanId: FieldRef<"FinancialResponsible", 'BigInt'>
    readonly name: FieldRef<"FinancialResponsible", 'String'>
    readonly cpfCnpj: FieldRef<"FinancialResponsible", 'String'>
    readonly email: FieldRef<"FinancialResponsible", 'String'>
    readonly phone: FieldRef<"FinancialResponsible", 'String'>
    readonly payerCustomerId: FieldRef<"FinancialResponsible", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * FinancialResponsible findUnique
   */
  export type FinancialResponsibleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * Filter, which FinancialResponsible to fetch.
     */
    where: FinancialResponsibleWhereUniqueInput
  }

  /**
   * FinancialResponsible findUniqueOrThrow
   */
  export type FinancialResponsibleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * Filter, which FinancialResponsible to fetch.
     */
    where: FinancialResponsibleWhereUniqueInput
  }

  /**
   * FinancialResponsible findFirst
   */
  export type FinancialResponsibleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * Filter, which FinancialResponsible to fetch.
     */
    where?: FinancialResponsibleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialResponsibles to fetch.
     */
    orderBy?: FinancialResponsibleOrderByWithRelationInput | FinancialResponsibleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialResponsibles.
     */
    cursor?: FinancialResponsibleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialResponsibles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialResponsibles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialResponsibles.
     */
    distinct?: FinancialResponsibleScalarFieldEnum | FinancialResponsibleScalarFieldEnum[]
  }

  /**
   * FinancialResponsible findFirstOrThrow
   */
  export type FinancialResponsibleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * Filter, which FinancialResponsible to fetch.
     */
    where?: FinancialResponsibleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialResponsibles to fetch.
     */
    orderBy?: FinancialResponsibleOrderByWithRelationInput | FinancialResponsibleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialResponsibles.
     */
    cursor?: FinancialResponsibleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialResponsibles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialResponsibles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialResponsibles.
     */
    distinct?: FinancialResponsibleScalarFieldEnum | FinancialResponsibleScalarFieldEnum[]
  }

  /**
   * FinancialResponsible findMany
   */
  export type FinancialResponsibleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * Filter, which FinancialResponsibles to fetch.
     */
    where?: FinancialResponsibleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialResponsibles to fetch.
     */
    orderBy?: FinancialResponsibleOrderByWithRelationInput | FinancialResponsibleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinancialResponsibles.
     */
    cursor?: FinancialResponsibleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialResponsibles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialResponsibles.
     */
    skip?: number
    distinct?: FinancialResponsibleScalarFieldEnum | FinancialResponsibleScalarFieldEnum[]
  }

  /**
   * FinancialResponsible create
   */
  export type FinancialResponsibleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * The data needed to create a FinancialResponsible.
     */
    data: XOR<FinancialResponsibleCreateInput, FinancialResponsibleUncheckedCreateInput>
  }

  /**
   * FinancialResponsible createMany
   */
  export type FinancialResponsibleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinancialResponsibles.
     */
    data: FinancialResponsibleCreateManyInput | FinancialResponsibleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FinancialResponsible createManyAndReturn
   */
  export type FinancialResponsibleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * The data used to create many FinancialResponsibles.
     */
    data: FinancialResponsibleCreateManyInput | FinancialResponsibleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialResponsible update
   */
  export type FinancialResponsibleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * The data needed to update a FinancialResponsible.
     */
    data: XOR<FinancialResponsibleUpdateInput, FinancialResponsibleUncheckedUpdateInput>
    /**
     * Choose, which FinancialResponsible to update.
     */
    where: FinancialResponsibleWhereUniqueInput
  }

  /**
   * FinancialResponsible updateMany
   */
  export type FinancialResponsibleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinancialResponsibles.
     */
    data: XOR<FinancialResponsibleUpdateManyMutationInput, FinancialResponsibleUncheckedUpdateManyInput>
    /**
     * Filter which FinancialResponsibles to update
     */
    where?: FinancialResponsibleWhereInput
    /**
     * Limit how many FinancialResponsibles to update.
     */
    limit?: number
  }

  /**
   * FinancialResponsible updateManyAndReturn
   */
  export type FinancialResponsibleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * The data used to update FinancialResponsibles.
     */
    data: XOR<FinancialResponsibleUpdateManyMutationInput, FinancialResponsibleUncheckedUpdateManyInput>
    /**
     * Filter which FinancialResponsibles to update
     */
    where?: FinancialResponsibleWhereInput
    /**
     * Limit how many FinancialResponsibles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialResponsible upsert
   */
  export type FinancialResponsibleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * The filter to search for the FinancialResponsible to update in case it exists.
     */
    where: FinancialResponsibleWhereUniqueInput
    /**
     * In case the FinancialResponsible found by the `where` argument doesn't exist, create a new FinancialResponsible with this data.
     */
    create: XOR<FinancialResponsibleCreateInput, FinancialResponsibleUncheckedCreateInput>
    /**
     * In case the FinancialResponsible was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinancialResponsibleUpdateInput, FinancialResponsibleUncheckedUpdateInput>
  }

  /**
   * FinancialResponsible delete
   */
  export type FinancialResponsibleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
    /**
     * Filter which FinancialResponsible to delete.
     */
    where: FinancialResponsibleWhereUniqueInput
  }

  /**
   * FinancialResponsible deleteMany
   */
  export type FinancialResponsibleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialResponsibles to delete
     */
    where?: FinancialResponsibleWhereInput
    /**
     * Limit how many FinancialResponsibles to delete.
     */
    limit?: number
  }

  /**
   * FinancialResponsible.payer
   */
  export type FinancialResponsible$payerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * FinancialResponsible without action
   */
  export type FinancialResponsibleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialResponsible
     */
    select?: FinancialResponsibleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialResponsible
     */
    omit?: FinancialResponsibleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialResponsibleInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    id: number | null
    planId: number | null
    value: Decimal | null
    receivedValue: Decimal | null
    discount: Decimal | null
    interest: Decimal | null
    paymentFormId: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    id: bigint | null
    planId: bigint | null
    value: Decimal | null
    receivedValue: Decimal | null
    discount: Decimal | null
    interest: Decimal | null
    paymentFormId: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: bigint | null
    planId: bigint | null
    dueDate: Date | null
    value: Decimal | null
    status: $Enums.BoletoStatus | null
    paymentDate: Date | null
    receivedValue: Decimal | null
    discount: Decimal | null
    interest: Decimal | null
    paymentMode: string | null
    bankId: string | null
    ourNumber: string | null
    installment: string | null
    paymentFormId: number | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: bigint | null
    planId: bigint | null
    dueDate: Date | null
    value: Decimal | null
    status: $Enums.BoletoStatus | null
    paymentDate: Date | null
    receivedValue: Decimal | null
    discount: Decimal | null
    interest: Decimal | null
    paymentMode: string | null
    bankId: string | null
    ourNumber: string | null
    installment: string | null
    paymentFormId: number | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    planId: number
    dueDate: number
    value: number
    status: number
    paymentDate: number
    receivedValue: number
    discount: number
    interest: number
    paymentMode: number
    bankId: number
    ourNumber: number
    installment: number
    paymentFormId: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    id?: true
    planId?: true
    value?: true
    receivedValue?: true
    discount?: true
    interest?: true
    paymentFormId?: true
  }

  export type InvoiceSumAggregateInputType = {
    id?: true
    planId?: true
    value?: true
    receivedValue?: true
    discount?: true
    interest?: true
    paymentFormId?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    planId?: true
    dueDate?: true
    value?: true
    status?: true
    paymentDate?: true
    receivedValue?: true
    discount?: true
    interest?: true
    paymentMode?: true
    bankId?: true
    ourNumber?: true
    installment?: true
    paymentFormId?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    planId?: true
    dueDate?: true
    value?: true
    status?: true
    paymentDate?: true
    receivedValue?: true
    discount?: true
    interest?: true
    paymentMode?: true
    bankId?: true
    ourNumber?: true
    installment?: true
    paymentFormId?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    planId?: true
    dueDate?: true
    value?: true
    status?: true
    paymentDate?: true
    receivedValue?: true
    discount?: true
    interest?: true
    paymentMode?: true
    bankId?: true
    ourNumber?: true
    installment?: true
    paymentFormId?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: bigint
    planId: bigint
    dueDate: Date
    value: Decimal
    status: $Enums.BoletoStatus
    paymentDate: Date | null
    receivedValue: Decimal | null
    discount: Decimal | null
    interest: Decimal | null
    paymentMode: string | null
    bankId: string | null
    ourNumber: string | null
    installment: string | null
    paymentFormId: number | null
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    dueDate?: boolean
    value?: boolean
    status?: boolean
    paymentDate?: boolean
    receivedValue?: boolean
    discount?: boolean
    interest?: boolean
    paymentMode?: boolean
    bankId?: boolean
    ourNumber?: boolean
    installment?: boolean
    paymentFormId?: boolean
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    portalPayments?: boolean | Invoice$portalPaymentsArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    dueDate?: boolean
    value?: boolean
    status?: boolean
    paymentDate?: boolean
    receivedValue?: boolean
    discount?: boolean
    interest?: boolean
    paymentMode?: boolean
    bankId?: boolean
    ourNumber?: boolean
    installment?: boolean
    paymentFormId?: boolean
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    dueDate?: boolean
    value?: boolean
    status?: boolean
    paymentDate?: boolean
    receivedValue?: boolean
    discount?: boolean
    interest?: boolean
    paymentMode?: boolean
    bankId?: boolean
    ourNumber?: boolean
    installment?: boolean
    paymentFormId?: boolean
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    planId?: boolean
    dueDate?: boolean
    value?: boolean
    status?: boolean
    paymentDate?: boolean
    receivedValue?: boolean
    discount?: boolean
    interest?: boolean
    paymentMode?: boolean
    bankId?: boolean
    ourNumber?: boolean
    installment?: boolean
    paymentFormId?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "dueDate" | "value" | "status" | "paymentDate" | "receivedValue" | "discount" | "interest" | "paymentMode" | "bankId" | "ourNumber" | "installment" | "paymentFormId", ExtArgs["result"]["invoice"]>
  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
    portalPayments?: boolean | Invoice$portalPaymentsArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | CustomerPlanDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      plan: Prisma.$CustomerPlanPayload<ExtArgs>
      portalPayments: Prisma.$PortalPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      planId: bigint
      dueDate: Date
      value: Prisma.Decimal
      status: $Enums.BoletoStatus
      paymentDate: Date | null
      receivedValue: Prisma.Decimal | null
      discount: Prisma.Decimal | null
      interest: Prisma.Decimal | null
      paymentMode: string | null
      bankId: string | null
      ourNumber: string | null
      installment: string | null
      paymentFormId: number | null
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
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
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
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
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends CustomerPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerPlanDefaultArgs<ExtArgs>>): Prisma__CustomerPlanClient<$Result.GetResult<Prisma.$CustomerPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    portalPayments<T extends Invoice$portalPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$portalPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'BigInt'>
    readonly planId: FieldRef<"Invoice", 'BigInt'>
    readonly dueDate: FieldRef<"Invoice", 'DateTime'>
    readonly value: FieldRef<"Invoice", 'Decimal'>
    readonly status: FieldRef<"Invoice", 'BoletoStatus'>
    readonly paymentDate: FieldRef<"Invoice", 'DateTime'>
    readonly receivedValue: FieldRef<"Invoice", 'Decimal'>
    readonly discount: FieldRef<"Invoice", 'Decimal'>
    readonly interest: FieldRef<"Invoice", 'Decimal'>
    readonly paymentMode: FieldRef<"Invoice", 'String'>
    readonly bankId: FieldRef<"Invoice", 'String'>
    readonly ourNumber: FieldRef<"Invoice", 'String'>
    readonly installment: FieldRef<"Invoice", 'String'>
    readonly paymentFormId: FieldRef<"Invoice", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice.portalPayments
   */
  export type Invoice$portalPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    where?: PortalPaymentWhereInput
    orderBy?: PortalPaymentOrderByWithRelationInput | PortalPaymentOrderByWithRelationInput[]
    cursor?: PortalPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortalPaymentScalarFieldEnum | PortalPaymentScalarFieldEnum[]
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model PortalPayment
   */

  export type AggregatePortalPayment = {
    _count: PortalPaymentCountAggregateOutputType | null
    _avg: PortalPaymentAvgAggregateOutputType | null
    _sum: PortalPaymentSumAggregateOutputType | null
    _min: PortalPaymentMinAggregateOutputType | null
    _max: PortalPaymentMaxAggregateOutputType | null
  }

  export type PortalPaymentAvgAggregateOutputType = {
    invoiceId: number | null
    customerId: number | null
    value: Decimal | null
    netValue: Decimal | null
  }

  export type PortalPaymentSumAggregateOutputType = {
    invoiceId: bigint | null
    customerId: bigint | null
    value: Decimal | null
    netValue: Decimal | null
  }

  export type PortalPaymentMinAggregateOutputType = {
    id: string | null
    invoiceId: bigint | null
    customerId: bigint | null
    asaasPaymentId: string | null
    paymentMethod: string | null
    status: string | null
    invoiceUrl: string | null
    bankSlipUrl: string | null
    pixCopyPaste: string | null
    value: Decimal | null
    netValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortalPaymentMaxAggregateOutputType = {
    id: string | null
    invoiceId: bigint | null
    customerId: bigint | null
    asaasPaymentId: string | null
    paymentMethod: string | null
    status: string | null
    invoiceUrl: string | null
    bankSlipUrl: string | null
    pixCopyPaste: string | null
    value: Decimal | null
    netValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortalPaymentCountAggregateOutputType = {
    id: number
    invoiceId: number
    customerId: number
    asaasPaymentId: number
    paymentMethod: number
    status: number
    invoiceUrl: number
    bankSlipUrl: number
    pixCopyPaste: number
    value: number
    netValue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortalPaymentAvgAggregateInputType = {
    invoiceId?: true
    customerId?: true
    value?: true
    netValue?: true
  }

  export type PortalPaymentSumAggregateInputType = {
    invoiceId?: true
    customerId?: true
    value?: true
    netValue?: true
  }

  export type PortalPaymentMinAggregateInputType = {
    id?: true
    invoiceId?: true
    customerId?: true
    asaasPaymentId?: true
    paymentMethod?: true
    status?: true
    invoiceUrl?: true
    bankSlipUrl?: true
    pixCopyPaste?: true
    value?: true
    netValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortalPaymentMaxAggregateInputType = {
    id?: true
    invoiceId?: true
    customerId?: true
    asaasPaymentId?: true
    paymentMethod?: true
    status?: true
    invoiceUrl?: true
    bankSlipUrl?: true
    pixCopyPaste?: true
    value?: true
    netValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortalPaymentCountAggregateInputType = {
    id?: true
    invoiceId?: true
    customerId?: true
    asaasPaymentId?: true
    paymentMethod?: true
    status?: true
    invoiceUrl?: true
    bankSlipUrl?: true
    pixCopyPaste?: true
    value?: true
    netValue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortalPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalPayment to aggregate.
     */
    where?: PortalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalPayments to fetch.
     */
    orderBy?: PortalPaymentOrderByWithRelationInput | PortalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortalPayments
    **/
    _count?: true | PortalPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortalPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortalPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortalPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortalPaymentMaxAggregateInputType
  }

  export type GetPortalPaymentAggregateType<T extends PortalPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePortalPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortalPayment[P]>
      : GetScalarType<T[P], AggregatePortalPayment[P]>
  }




  export type PortalPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalPaymentWhereInput
    orderBy?: PortalPaymentOrderByWithAggregationInput | PortalPaymentOrderByWithAggregationInput[]
    by: PortalPaymentScalarFieldEnum[] | PortalPaymentScalarFieldEnum
    having?: PortalPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortalPaymentCountAggregateInputType | true
    _avg?: PortalPaymentAvgAggregateInputType
    _sum?: PortalPaymentSumAggregateInputType
    _min?: PortalPaymentMinAggregateInputType
    _max?: PortalPaymentMaxAggregateInputType
  }

  export type PortalPaymentGroupByOutputType = {
    id: string
    invoiceId: bigint | null
    customerId: bigint
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl: string | null
    bankSlipUrl: string | null
    pixCopyPaste: string | null
    value: Decimal
    netValue: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: PortalPaymentCountAggregateOutputType | null
    _avg: PortalPaymentAvgAggregateOutputType | null
    _sum: PortalPaymentSumAggregateOutputType | null
    _min: PortalPaymentMinAggregateOutputType | null
    _max: PortalPaymentMaxAggregateOutputType | null
  }

  type GetPortalPaymentGroupByPayload<T extends PortalPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortalPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortalPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortalPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PortalPaymentGroupByOutputType[P]>
        }
      >
    >


  export type PortalPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    customerId?: boolean
    asaasPaymentId?: boolean
    paymentMethod?: boolean
    status?: boolean
    invoiceUrl?: boolean
    bankSlipUrl?: boolean
    pixCopyPaste?: boolean
    value?: boolean
    netValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    invoice?: boolean | PortalPayment$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["portalPayment"]>

  export type PortalPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    customerId?: boolean
    asaasPaymentId?: boolean
    paymentMethod?: boolean
    status?: boolean
    invoiceUrl?: boolean
    bankSlipUrl?: boolean
    pixCopyPaste?: boolean
    value?: boolean
    netValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    invoice?: boolean | PortalPayment$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["portalPayment"]>

  export type PortalPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    customerId?: boolean
    asaasPaymentId?: boolean
    paymentMethod?: boolean
    status?: boolean
    invoiceUrl?: boolean
    bankSlipUrl?: boolean
    pixCopyPaste?: boolean
    value?: boolean
    netValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    invoice?: boolean | PortalPayment$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["portalPayment"]>

  export type PortalPaymentSelectScalar = {
    id?: boolean
    invoiceId?: boolean
    customerId?: boolean
    asaasPaymentId?: boolean
    paymentMethod?: boolean
    status?: boolean
    invoiceUrl?: boolean
    bankSlipUrl?: boolean
    pixCopyPaste?: boolean
    value?: boolean
    netValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortalPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceId" | "customerId" | "asaasPaymentId" | "paymentMethod" | "status" | "invoiceUrl" | "bankSlipUrl" | "pixCopyPaste" | "value" | "netValue" | "createdAt" | "updatedAt", ExtArgs["result"]["portalPayment"]>
  export type PortalPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    invoice?: boolean | PortalPayment$invoiceArgs<ExtArgs>
  }
  export type PortalPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    invoice?: boolean | PortalPayment$invoiceArgs<ExtArgs>
  }
  export type PortalPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    invoice?: boolean | PortalPayment$invoiceArgs<ExtArgs>
  }

  export type $PortalPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortalPayment"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      invoice: Prisma.$InvoicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceId: bigint | null
      customerId: bigint
      asaasPaymentId: string
      paymentMethod: string
      status: string
      invoiceUrl: string | null
      bankSlipUrl: string | null
      pixCopyPaste: string | null
      value: Prisma.Decimal
      netValue: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portalPayment"]>
    composites: {}
  }

  type PortalPaymentGetPayload<S extends boolean | null | undefined | PortalPaymentDefaultArgs> = $Result.GetResult<Prisma.$PortalPaymentPayload, S>

  type PortalPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortalPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortalPaymentCountAggregateInputType | true
    }

  export interface PortalPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortalPayment'], meta: { name: 'PortalPayment' } }
    /**
     * Find zero or one PortalPayment that matches the filter.
     * @param {PortalPaymentFindUniqueArgs} args - Arguments to find a PortalPayment
     * @example
     * // Get one PortalPayment
     * const portalPayment = await prisma.portalPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortalPaymentFindUniqueArgs>(args: SelectSubset<T, PortalPaymentFindUniqueArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortalPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortalPaymentFindUniqueOrThrowArgs} args - Arguments to find a PortalPayment
     * @example
     * // Get one PortalPayment
     * const portalPayment = await prisma.portalPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortalPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PortalPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortalPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentFindFirstArgs} args - Arguments to find a PortalPayment
     * @example
     * // Get one PortalPayment
     * const portalPayment = await prisma.portalPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortalPaymentFindFirstArgs>(args?: SelectSubset<T, PortalPaymentFindFirstArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortalPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentFindFirstOrThrowArgs} args - Arguments to find a PortalPayment
     * @example
     * // Get one PortalPayment
     * const portalPayment = await prisma.portalPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortalPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PortalPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortalPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortalPayments
     * const portalPayments = await prisma.portalPayment.findMany()
     * 
     * // Get first 10 PortalPayments
     * const portalPayments = await prisma.portalPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portalPaymentWithIdOnly = await prisma.portalPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortalPaymentFindManyArgs>(args?: SelectSubset<T, PortalPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortalPayment.
     * @param {PortalPaymentCreateArgs} args - Arguments to create a PortalPayment.
     * @example
     * // Create one PortalPayment
     * const PortalPayment = await prisma.portalPayment.create({
     *   data: {
     *     // ... data to create a PortalPayment
     *   }
     * })
     * 
     */
    create<T extends PortalPaymentCreateArgs>(args: SelectSubset<T, PortalPaymentCreateArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortalPayments.
     * @param {PortalPaymentCreateManyArgs} args - Arguments to create many PortalPayments.
     * @example
     * // Create many PortalPayments
     * const portalPayment = await prisma.portalPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortalPaymentCreateManyArgs>(args?: SelectSubset<T, PortalPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortalPayments and returns the data saved in the database.
     * @param {PortalPaymentCreateManyAndReturnArgs} args - Arguments to create many PortalPayments.
     * @example
     * // Create many PortalPayments
     * const portalPayment = await prisma.portalPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortalPayments and only return the `id`
     * const portalPaymentWithIdOnly = await prisma.portalPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortalPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PortalPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PortalPayment.
     * @param {PortalPaymentDeleteArgs} args - Arguments to delete one PortalPayment.
     * @example
     * // Delete one PortalPayment
     * const PortalPayment = await prisma.portalPayment.delete({
     *   where: {
     *     // ... filter to delete one PortalPayment
     *   }
     * })
     * 
     */
    delete<T extends PortalPaymentDeleteArgs>(args: SelectSubset<T, PortalPaymentDeleteArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortalPayment.
     * @param {PortalPaymentUpdateArgs} args - Arguments to update one PortalPayment.
     * @example
     * // Update one PortalPayment
     * const portalPayment = await prisma.portalPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortalPaymentUpdateArgs>(args: SelectSubset<T, PortalPaymentUpdateArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortalPayments.
     * @param {PortalPaymentDeleteManyArgs} args - Arguments to filter PortalPayments to delete.
     * @example
     * // Delete a few PortalPayments
     * const { count } = await prisma.portalPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortalPaymentDeleteManyArgs>(args?: SelectSubset<T, PortalPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortalPayments
     * const portalPayment = await prisma.portalPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortalPaymentUpdateManyArgs>(args: SelectSubset<T, PortalPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalPayments and returns the data updated in the database.
     * @param {PortalPaymentUpdateManyAndReturnArgs} args - Arguments to update many PortalPayments.
     * @example
     * // Update many PortalPayments
     * const portalPayment = await prisma.portalPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PortalPayments and only return the `id`
     * const portalPaymentWithIdOnly = await prisma.portalPayment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PortalPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PortalPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PortalPayment.
     * @param {PortalPaymentUpsertArgs} args - Arguments to update or create a PortalPayment.
     * @example
     * // Update or create a PortalPayment
     * const portalPayment = await prisma.portalPayment.upsert({
     *   create: {
     *     // ... data to create a PortalPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortalPayment we want to update
     *   }
     * })
     */
    upsert<T extends PortalPaymentUpsertArgs>(args: SelectSubset<T, PortalPaymentUpsertArgs<ExtArgs>>): Prisma__PortalPaymentClient<$Result.GetResult<Prisma.$PortalPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortalPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentCountArgs} args - Arguments to filter PortalPayments to count.
     * @example
     * // Count the number of PortalPayments
     * const count = await prisma.portalPayment.count({
     *   where: {
     *     // ... the filter for the PortalPayments we want to count
     *   }
     * })
    **/
    count<T extends PortalPaymentCountArgs>(
      args?: Subset<T, PortalPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortalPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortalPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PortalPaymentAggregateArgs>(args: Subset<T, PortalPaymentAggregateArgs>): Prisma.PrismaPromise<GetPortalPaymentAggregateType<T>>

    /**
     * Group by PortalPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalPaymentGroupByArgs} args - Group by arguments.
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
      T extends PortalPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortalPaymentGroupByArgs['orderBy'] }
        : { orderBy?: PortalPaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PortalPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortalPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortalPayment model
   */
  readonly fields: PortalPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortalPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortalPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invoice<T extends PortalPayment$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, PortalPayment$invoiceArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PortalPayment model
   */
  interface PortalPaymentFieldRefs {
    readonly id: FieldRef<"PortalPayment", 'String'>
    readonly invoiceId: FieldRef<"PortalPayment", 'BigInt'>
    readonly customerId: FieldRef<"PortalPayment", 'BigInt'>
    readonly asaasPaymentId: FieldRef<"PortalPayment", 'String'>
    readonly paymentMethod: FieldRef<"PortalPayment", 'String'>
    readonly status: FieldRef<"PortalPayment", 'String'>
    readonly invoiceUrl: FieldRef<"PortalPayment", 'String'>
    readonly bankSlipUrl: FieldRef<"PortalPayment", 'String'>
    readonly pixCopyPaste: FieldRef<"PortalPayment", 'String'>
    readonly value: FieldRef<"PortalPayment", 'Decimal'>
    readonly netValue: FieldRef<"PortalPayment", 'Decimal'>
    readonly createdAt: FieldRef<"PortalPayment", 'DateTime'>
    readonly updatedAt: FieldRef<"PortalPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortalPayment findUnique
   */
  export type PortalPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PortalPayment to fetch.
     */
    where: PortalPaymentWhereUniqueInput
  }

  /**
   * PortalPayment findUniqueOrThrow
   */
  export type PortalPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PortalPayment to fetch.
     */
    where: PortalPaymentWhereUniqueInput
  }

  /**
   * PortalPayment findFirst
   */
  export type PortalPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PortalPayment to fetch.
     */
    where?: PortalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalPayments to fetch.
     */
    orderBy?: PortalPaymentOrderByWithRelationInput | PortalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalPayments.
     */
    cursor?: PortalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalPayments.
     */
    distinct?: PortalPaymentScalarFieldEnum | PortalPaymentScalarFieldEnum[]
  }

  /**
   * PortalPayment findFirstOrThrow
   */
  export type PortalPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PortalPayment to fetch.
     */
    where?: PortalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalPayments to fetch.
     */
    orderBy?: PortalPaymentOrderByWithRelationInput | PortalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalPayments.
     */
    cursor?: PortalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalPayments.
     */
    distinct?: PortalPaymentScalarFieldEnum | PortalPaymentScalarFieldEnum[]
  }

  /**
   * PortalPayment findMany
   */
  export type PortalPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PortalPayments to fetch.
     */
    where?: PortalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalPayments to fetch.
     */
    orderBy?: PortalPaymentOrderByWithRelationInput | PortalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortalPayments.
     */
    cursor?: PortalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalPayments.
     */
    skip?: number
    distinct?: PortalPaymentScalarFieldEnum | PortalPaymentScalarFieldEnum[]
  }

  /**
   * PortalPayment create
   */
  export type PortalPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a PortalPayment.
     */
    data: XOR<PortalPaymentCreateInput, PortalPaymentUncheckedCreateInput>
  }

  /**
   * PortalPayment createMany
   */
  export type PortalPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortalPayments.
     */
    data: PortalPaymentCreateManyInput | PortalPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalPayment createManyAndReturn
   */
  export type PortalPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many PortalPayments.
     */
    data: PortalPaymentCreateManyInput | PortalPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PortalPayment update
   */
  export type PortalPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a PortalPayment.
     */
    data: XOR<PortalPaymentUpdateInput, PortalPaymentUncheckedUpdateInput>
    /**
     * Choose, which PortalPayment to update.
     */
    where: PortalPaymentWhereUniqueInput
  }

  /**
   * PortalPayment updateMany
   */
  export type PortalPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortalPayments.
     */
    data: XOR<PortalPaymentUpdateManyMutationInput, PortalPaymentUncheckedUpdateManyInput>
    /**
     * Filter which PortalPayments to update
     */
    where?: PortalPaymentWhereInput
    /**
     * Limit how many PortalPayments to update.
     */
    limit?: number
  }

  /**
   * PortalPayment updateManyAndReturn
   */
  export type PortalPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * The data used to update PortalPayments.
     */
    data: XOR<PortalPaymentUpdateManyMutationInput, PortalPaymentUncheckedUpdateManyInput>
    /**
     * Filter which PortalPayments to update
     */
    where?: PortalPaymentWhereInput
    /**
     * Limit how many PortalPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PortalPayment upsert
   */
  export type PortalPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the PortalPayment to update in case it exists.
     */
    where: PortalPaymentWhereUniqueInput
    /**
     * In case the PortalPayment found by the `where` argument doesn't exist, create a new PortalPayment with this data.
     */
    create: XOR<PortalPaymentCreateInput, PortalPaymentUncheckedCreateInput>
    /**
     * In case the PortalPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortalPaymentUpdateInput, PortalPaymentUncheckedUpdateInput>
  }

  /**
   * PortalPayment delete
   */
  export type PortalPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
    /**
     * Filter which PortalPayment to delete.
     */
    where: PortalPaymentWhereUniqueInput
  }

  /**
   * PortalPayment deleteMany
   */
  export type PortalPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalPayments to delete
     */
    where?: PortalPaymentWhereInput
    /**
     * Limit how many PortalPayments to delete.
     */
    limit?: number
  }

  /**
   * PortalPayment.invoice
   */
  export type PortalPayment$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
  }

  /**
   * PortalPayment without action
   */
  export type PortalPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalPayment
     */
    select?: PortalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalPayment
     */
    omit?: PortalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalPaymentInclude<ExtArgs> | null
  }


  /**
   * Model ChangeRequest
   */

  export type AggregateChangeRequest = {
    _count: ChangeRequestCountAggregateOutputType | null
    _avg: ChangeRequestAvgAggregateOutputType | null
    _sum: ChangeRequestSumAggregateOutputType | null
    _min: ChangeRequestMinAggregateOutputType | null
    _max: ChangeRequestMaxAggregateOutputType | null
  }

  export type ChangeRequestAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type ChangeRequestSumAggregateOutputType = {
    id: number | null
    customerId: bigint | null
  }

  export type ChangeRequestMinAggregateOutputType = {
    id: number | null
    customerId: bigint | null
    type: $Enums.ChangeType | null
    status: $Enums.RequestStatus | null
    reviewedBy: string | null
    createdAt: Date | null
  }

  export type ChangeRequestMaxAggregateOutputType = {
    id: number | null
    customerId: bigint | null
    type: $Enums.ChangeType | null
    status: $Enums.RequestStatus | null
    reviewedBy: string | null
    createdAt: Date | null
  }

  export type ChangeRequestCountAggregateOutputType = {
    id: number
    customerId: number
    type: number
    oldData: number
    newData: number
    status: number
    reviewedBy: number
    createdAt: number
    _all: number
  }


  export type ChangeRequestAvgAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type ChangeRequestSumAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type ChangeRequestMinAggregateInputType = {
    id?: true
    customerId?: true
    type?: true
    status?: true
    reviewedBy?: true
    createdAt?: true
  }

  export type ChangeRequestMaxAggregateInputType = {
    id?: true
    customerId?: true
    type?: true
    status?: true
    reviewedBy?: true
    createdAt?: true
  }

  export type ChangeRequestCountAggregateInputType = {
    id?: true
    customerId?: true
    type?: true
    oldData?: true
    newData?: true
    status?: true
    reviewedBy?: true
    createdAt?: true
    _all?: true
  }

  export type ChangeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChangeRequest to aggregate.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChangeRequests
    **/
    _count?: true | ChangeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChangeRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChangeRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChangeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChangeRequestMaxAggregateInputType
  }

  export type GetChangeRequestAggregateType<T extends ChangeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateChangeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChangeRequest[P]>
      : GetScalarType<T[P], AggregateChangeRequest[P]>
  }




  export type ChangeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeRequestWhereInput
    orderBy?: ChangeRequestOrderByWithAggregationInput | ChangeRequestOrderByWithAggregationInput[]
    by: ChangeRequestScalarFieldEnum[] | ChangeRequestScalarFieldEnum
    having?: ChangeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChangeRequestCountAggregateInputType | true
    _avg?: ChangeRequestAvgAggregateInputType
    _sum?: ChangeRequestSumAggregateInputType
    _min?: ChangeRequestMinAggregateInputType
    _max?: ChangeRequestMaxAggregateInputType
  }

  export type ChangeRequestGroupByOutputType = {
    id: number
    customerId: bigint
    type: $Enums.ChangeType
    oldData: JsonValue | null
    newData: JsonValue
    status: $Enums.RequestStatus
    reviewedBy: string | null
    createdAt: Date
    _count: ChangeRequestCountAggregateOutputType | null
    _avg: ChangeRequestAvgAggregateOutputType | null
    _sum: ChangeRequestSumAggregateOutputType | null
    _min: ChangeRequestMinAggregateOutputType | null
    _max: ChangeRequestMaxAggregateOutputType | null
  }

  type GetChangeRequestGroupByPayload<T extends ChangeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChangeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChangeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChangeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ChangeRequestGroupByOutputType[P]>
        }
      >
    >


  export type ChangeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    type?: boolean
    oldData?: boolean
    newData?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["changeRequest"]>

  export type ChangeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    type?: boolean
    oldData?: boolean
    newData?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["changeRequest"]>

  export type ChangeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    type?: boolean
    oldData?: boolean
    newData?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["changeRequest"]>

  export type ChangeRequestSelectScalar = {
    id?: boolean
    customerId?: boolean
    type?: boolean
    oldData?: boolean
    newData?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
  }

  export type ChangeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "type" | "oldData" | "newData" | "status" | "reviewedBy" | "createdAt", ExtArgs["result"]["changeRequest"]>
  export type ChangeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type ChangeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type ChangeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $ChangeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChangeRequest"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      customerId: bigint
      type: $Enums.ChangeType
      oldData: Prisma.JsonValue | null
      newData: Prisma.JsonValue
      status: $Enums.RequestStatus
      reviewedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["changeRequest"]>
    composites: {}
  }

  type ChangeRequestGetPayload<S extends boolean | null | undefined | ChangeRequestDefaultArgs> = $Result.GetResult<Prisma.$ChangeRequestPayload, S>

  type ChangeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChangeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChangeRequestCountAggregateInputType | true
    }

  export interface ChangeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChangeRequest'], meta: { name: 'ChangeRequest' } }
    /**
     * Find zero or one ChangeRequest that matches the filter.
     * @param {ChangeRequestFindUniqueArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChangeRequestFindUniqueArgs>(args: SelectSubset<T, ChangeRequestFindUniqueArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChangeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChangeRequestFindUniqueOrThrowArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChangeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ChangeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChangeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestFindFirstArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChangeRequestFindFirstArgs>(args?: SelectSubset<T, ChangeRequestFindFirstArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChangeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestFindFirstOrThrowArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChangeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ChangeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChangeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChangeRequests
     * const changeRequests = await prisma.changeRequest.findMany()
     * 
     * // Get first 10 ChangeRequests
     * const changeRequests = await prisma.changeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const changeRequestWithIdOnly = await prisma.changeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChangeRequestFindManyArgs>(args?: SelectSubset<T, ChangeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChangeRequest.
     * @param {ChangeRequestCreateArgs} args - Arguments to create a ChangeRequest.
     * @example
     * // Create one ChangeRequest
     * const ChangeRequest = await prisma.changeRequest.create({
     *   data: {
     *     // ... data to create a ChangeRequest
     *   }
     * })
     * 
     */
    create<T extends ChangeRequestCreateArgs>(args: SelectSubset<T, ChangeRequestCreateArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChangeRequests.
     * @param {ChangeRequestCreateManyArgs} args - Arguments to create many ChangeRequests.
     * @example
     * // Create many ChangeRequests
     * const changeRequest = await prisma.changeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChangeRequestCreateManyArgs>(args?: SelectSubset<T, ChangeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChangeRequests and returns the data saved in the database.
     * @param {ChangeRequestCreateManyAndReturnArgs} args - Arguments to create many ChangeRequests.
     * @example
     * // Create many ChangeRequests
     * const changeRequest = await prisma.changeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChangeRequests and only return the `id`
     * const changeRequestWithIdOnly = await prisma.changeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChangeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ChangeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChangeRequest.
     * @param {ChangeRequestDeleteArgs} args - Arguments to delete one ChangeRequest.
     * @example
     * // Delete one ChangeRequest
     * const ChangeRequest = await prisma.changeRequest.delete({
     *   where: {
     *     // ... filter to delete one ChangeRequest
     *   }
     * })
     * 
     */
    delete<T extends ChangeRequestDeleteArgs>(args: SelectSubset<T, ChangeRequestDeleteArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChangeRequest.
     * @param {ChangeRequestUpdateArgs} args - Arguments to update one ChangeRequest.
     * @example
     * // Update one ChangeRequest
     * const changeRequest = await prisma.changeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChangeRequestUpdateArgs>(args: SelectSubset<T, ChangeRequestUpdateArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChangeRequests.
     * @param {ChangeRequestDeleteManyArgs} args - Arguments to filter ChangeRequests to delete.
     * @example
     * // Delete a few ChangeRequests
     * const { count } = await prisma.changeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChangeRequestDeleteManyArgs>(args?: SelectSubset<T, ChangeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChangeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChangeRequests
     * const changeRequest = await prisma.changeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChangeRequestUpdateManyArgs>(args: SelectSubset<T, ChangeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChangeRequests and returns the data updated in the database.
     * @param {ChangeRequestUpdateManyAndReturnArgs} args - Arguments to update many ChangeRequests.
     * @example
     * // Update many ChangeRequests
     * const changeRequest = await prisma.changeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChangeRequests and only return the `id`
     * const changeRequestWithIdOnly = await prisma.changeRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChangeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ChangeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChangeRequest.
     * @param {ChangeRequestUpsertArgs} args - Arguments to update or create a ChangeRequest.
     * @example
     * // Update or create a ChangeRequest
     * const changeRequest = await prisma.changeRequest.upsert({
     *   create: {
     *     // ... data to create a ChangeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChangeRequest we want to update
     *   }
     * })
     */
    upsert<T extends ChangeRequestUpsertArgs>(args: SelectSubset<T, ChangeRequestUpsertArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChangeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestCountArgs} args - Arguments to filter ChangeRequests to count.
     * @example
     * // Count the number of ChangeRequests
     * const count = await prisma.changeRequest.count({
     *   where: {
     *     // ... the filter for the ChangeRequests we want to count
     *   }
     * })
    **/
    count<T extends ChangeRequestCountArgs>(
      args?: Subset<T, ChangeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChangeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChangeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChangeRequestAggregateArgs>(args: Subset<T, ChangeRequestAggregateArgs>): Prisma.PrismaPromise<GetChangeRequestAggregateType<T>>

    /**
     * Group by ChangeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestGroupByArgs} args - Group by arguments.
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
      T extends ChangeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChangeRequestGroupByArgs['orderBy'] }
        : { orderBy?: ChangeRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChangeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChangeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChangeRequest model
   */
  readonly fields: ChangeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChangeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChangeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChangeRequest model
   */
  interface ChangeRequestFieldRefs {
    readonly id: FieldRef<"ChangeRequest", 'Int'>
    readonly customerId: FieldRef<"ChangeRequest", 'BigInt'>
    readonly type: FieldRef<"ChangeRequest", 'ChangeType'>
    readonly oldData: FieldRef<"ChangeRequest", 'Json'>
    readonly newData: FieldRef<"ChangeRequest", 'Json'>
    readonly status: FieldRef<"ChangeRequest", 'RequestStatus'>
    readonly reviewedBy: FieldRef<"ChangeRequest", 'String'>
    readonly createdAt: FieldRef<"ChangeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChangeRequest findUnique
   */
  export type ChangeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest findUniqueOrThrow
   */
  export type ChangeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest findFirst
   */
  export type ChangeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangeRequests.
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChangeRequests.
     */
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * ChangeRequest findFirstOrThrow
   */
  export type ChangeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangeRequests.
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChangeRequests.
     */
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * ChangeRequest findMany
   */
  export type ChangeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequests to fetch.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChangeRequests.
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * ChangeRequest create
   */
  export type ChangeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ChangeRequest.
     */
    data: XOR<ChangeRequestCreateInput, ChangeRequestUncheckedCreateInput>
  }

  /**
   * ChangeRequest createMany
   */
  export type ChangeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChangeRequests.
     */
    data: ChangeRequestCreateManyInput | ChangeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChangeRequest createManyAndReturn
   */
  export type ChangeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ChangeRequests.
     */
    data: ChangeRequestCreateManyInput | ChangeRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChangeRequest update
   */
  export type ChangeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ChangeRequest.
     */
    data: XOR<ChangeRequestUpdateInput, ChangeRequestUncheckedUpdateInput>
    /**
     * Choose, which ChangeRequest to update.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest updateMany
   */
  export type ChangeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChangeRequests.
     */
    data: XOR<ChangeRequestUpdateManyMutationInput, ChangeRequestUncheckedUpdateManyInput>
    /**
     * Filter which ChangeRequests to update
     */
    where?: ChangeRequestWhereInput
    /**
     * Limit how many ChangeRequests to update.
     */
    limit?: number
  }

  /**
   * ChangeRequest updateManyAndReturn
   */
  export type ChangeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * The data used to update ChangeRequests.
     */
    data: XOR<ChangeRequestUpdateManyMutationInput, ChangeRequestUncheckedUpdateManyInput>
    /**
     * Filter which ChangeRequests to update
     */
    where?: ChangeRequestWhereInput
    /**
     * Limit how many ChangeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChangeRequest upsert
   */
  export type ChangeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ChangeRequest to update in case it exists.
     */
    where: ChangeRequestWhereUniqueInput
    /**
     * In case the ChangeRequest found by the `where` argument doesn't exist, create a new ChangeRequest with this data.
     */
    create: XOR<ChangeRequestCreateInput, ChangeRequestUncheckedCreateInput>
    /**
     * In case the ChangeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChangeRequestUpdateInput, ChangeRequestUncheckedUpdateInput>
  }

  /**
   * ChangeRequest delete
   */
  export type ChangeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter which ChangeRequest to delete.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest deleteMany
   */
  export type ChangeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChangeRequests to delete
     */
    where?: ChangeRequestWhereInput
    /**
     * Limit how many ChangeRequests to delete.
     */
    limit?: number
  }

  /**
   * ChangeRequest without action
   */
  export type ChangeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type AddressSumAggregateOutputType = {
    id: number | null
    customerId: bigint | null
  }

  export type AddressMinAggregateOutputType = {
    id: number | null
    customerId: bigint | null
    street: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    isMain: boolean | null
  }

  export type AddressMaxAggregateOutputType = {
    id: number | null
    customerId: bigint | null
    street: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    isMain: boolean | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    customerId: number
    street: number
    number: number
    complement: number
    neighborhood: number
    city: number
    state: number
    zipCode: number
    isMain: number
    _all: number
  }


  export type AddressAvgAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type AddressSumAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type AddressMinAggregateInputType = {
    id?: true
    customerId?: true
    street?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    zipCode?: true
    isMain?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    customerId?: true
    street?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    zipCode?: true
    isMain?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    customerId?: true
    street?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    zipCode?: true
    isMain?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _avg?: AddressAvgAggregateInputType
    _sum?: AddressSumAggregateInputType
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: number
    customerId: bigint
    street: string
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string
    state: string
    zipCode: string
    isMain: boolean
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    street?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    isMain?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    street?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    isMain?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    street?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    isMain?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    customerId?: boolean
    street?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    isMain?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "street" | "number" | "complement" | "neighborhood" | "city" | "state" | "zipCode" | "isMain", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type AddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      customerId: bigint
      street: string
      number: string | null
      complement: string | null
      neighborhood: string | null
      city: string
      state: string
      zipCode: string
      isMain: boolean
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
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
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
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
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'Int'>
    readonly customerId: FieldRef<"Address", 'BigInt'>
    readonly street: FieldRef<"Address", 'String'>
    readonly number: FieldRef<"Address", 'String'>
    readonly complement: FieldRef<"Address", 'String'>
    readonly neighborhood: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly zipCode: FieldRef<"Address", 'String'>
    readonly isMain: FieldRef<"Address", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model Phone
   */

  export type AggregatePhone = {
    _count: PhoneCountAggregateOutputType | null
    _avg: PhoneAvgAggregateOutputType | null
    _sum: PhoneSumAggregateOutputType | null
    _min: PhoneMinAggregateOutputType | null
    _max: PhoneMaxAggregateOutputType | null
  }

  export type PhoneAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type PhoneSumAggregateOutputType = {
    id: number | null
    customerId: bigint | null
  }

  export type PhoneMinAggregateOutputType = {
    id: number | null
    customerId: bigint | null
    number: string | null
    type: string | null
    observations: string | null
  }

  export type PhoneMaxAggregateOutputType = {
    id: number | null
    customerId: bigint | null
    number: string | null
    type: string | null
    observations: string | null
  }

  export type PhoneCountAggregateOutputType = {
    id: number
    customerId: number
    number: number
    type: number
    observations: number
    _all: number
  }


  export type PhoneAvgAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type PhoneSumAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type PhoneMinAggregateInputType = {
    id?: true
    customerId?: true
    number?: true
    type?: true
    observations?: true
  }

  export type PhoneMaxAggregateInputType = {
    id?: true
    customerId?: true
    number?: true
    type?: true
    observations?: true
  }

  export type PhoneCountAggregateInputType = {
    id?: true
    customerId?: true
    number?: true
    type?: true
    observations?: true
    _all?: true
  }

  export type PhoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phone to aggregate.
     */
    where?: PhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phones to fetch.
     */
    orderBy?: PhoneOrderByWithRelationInput | PhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Phones
    **/
    _count?: true | PhoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhoneMaxAggregateInputType
  }

  export type GetPhoneAggregateType<T extends PhoneAggregateArgs> = {
        [P in keyof T & keyof AggregatePhone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhone[P]>
      : GetScalarType<T[P], AggregatePhone[P]>
  }




  export type PhoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhoneWhereInput
    orderBy?: PhoneOrderByWithAggregationInput | PhoneOrderByWithAggregationInput[]
    by: PhoneScalarFieldEnum[] | PhoneScalarFieldEnum
    having?: PhoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhoneCountAggregateInputType | true
    _avg?: PhoneAvgAggregateInputType
    _sum?: PhoneSumAggregateInputType
    _min?: PhoneMinAggregateInputType
    _max?: PhoneMaxAggregateInputType
  }

  export type PhoneGroupByOutputType = {
    id: number
    customerId: bigint
    number: string
    type: string | null
    observations: string | null
    _count: PhoneCountAggregateOutputType | null
    _avg: PhoneAvgAggregateOutputType | null
    _sum: PhoneSumAggregateOutputType | null
    _min: PhoneMinAggregateOutputType | null
    _max: PhoneMaxAggregateOutputType | null
  }

  type GetPhoneGroupByPayload<T extends PhoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhoneGroupByOutputType[P]>
            : GetScalarType<T[P], PhoneGroupByOutputType[P]>
        }
      >
    >


  export type PhoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    number?: boolean
    type?: boolean
    observations?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phone"]>

  export type PhoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    number?: boolean
    type?: boolean
    observations?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phone"]>

  export type PhoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    number?: boolean
    type?: boolean
    observations?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phone"]>

  export type PhoneSelectScalar = {
    id?: boolean
    customerId?: boolean
    number?: boolean
    type?: boolean
    observations?: boolean
  }

  export type PhoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "number" | "type" | "observations", ExtArgs["result"]["phone"]>
  export type PhoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type PhoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type PhoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $PhonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Phone"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      customerId: bigint
      number: string
      type: string | null
      observations: string | null
    }, ExtArgs["result"]["phone"]>
    composites: {}
  }

  type PhoneGetPayload<S extends boolean | null | undefined | PhoneDefaultArgs> = $Result.GetResult<Prisma.$PhonePayload, S>

  type PhoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhoneCountAggregateInputType | true
    }

  export interface PhoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Phone'], meta: { name: 'Phone' } }
    /**
     * Find zero or one Phone that matches the filter.
     * @param {PhoneFindUniqueArgs} args - Arguments to find a Phone
     * @example
     * // Get one Phone
     * const phone = await prisma.phone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhoneFindUniqueArgs>(args: SelectSubset<T, PhoneFindUniqueArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Phone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhoneFindUniqueOrThrowArgs} args - Arguments to find a Phone
     * @example
     * // Get one Phone
     * const phone = await prisma.phone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhoneFindUniqueOrThrowArgs>(args: SelectSubset<T, PhoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Phone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneFindFirstArgs} args - Arguments to find a Phone
     * @example
     * // Get one Phone
     * const phone = await prisma.phone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhoneFindFirstArgs>(args?: SelectSubset<T, PhoneFindFirstArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Phone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneFindFirstOrThrowArgs} args - Arguments to find a Phone
     * @example
     * // Get one Phone
     * const phone = await prisma.phone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhoneFindFirstOrThrowArgs>(args?: SelectSubset<T, PhoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Phones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Phones
     * const phones = await prisma.phone.findMany()
     * 
     * // Get first 10 Phones
     * const phones = await prisma.phone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phoneWithIdOnly = await prisma.phone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhoneFindManyArgs>(args?: SelectSubset<T, PhoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Phone.
     * @param {PhoneCreateArgs} args - Arguments to create a Phone.
     * @example
     * // Create one Phone
     * const Phone = await prisma.phone.create({
     *   data: {
     *     // ... data to create a Phone
     *   }
     * })
     * 
     */
    create<T extends PhoneCreateArgs>(args: SelectSubset<T, PhoneCreateArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Phones.
     * @param {PhoneCreateManyArgs} args - Arguments to create many Phones.
     * @example
     * // Create many Phones
     * const phone = await prisma.phone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhoneCreateManyArgs>(args?: SelectSubset<T, PhoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Phones and returns the data saved in the database.
     * @param {PhoneCreateManyAndReturnArgs} args - Arguments to create many Phones.
     * @example
     * // Create many Phones
     * const phone = await prisma.phone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Phones and only return the `id`
     * const phoneWithIdOnly = await prisma.phone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhoneCreateManyAndReturnArgs>(args?: SelectSubset<T, PhoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Phone.
     * @param {PhoneDeleteArgs} args - Arguments to delete one Phone.
     * @example
     * // Delete one Phone
     * const Phone = await prisma.phone.delete({
     *   where: {
     *     // ... filter to delete one Phone
     *   }
     * })
     * 
     */
    delete<T extends PhoneDeleteArgs>(args: SelectSubset<T, PhoneDeleteArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Phone.
     * @param {PhoneUpdateArgs} args - Arguments to update one Phone.
     * @example
     * // Update one Phone
     * const phone = await prisma.phone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhoneUpdateArgs>(args: SelectSubset<T, PhoneUpdateArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Phones.
     * @param {PhoneDeleteManyArgs} args - Arguments to filter Phones to delete.
     * @example
     * // Delete a few Phones
     * const { count } = await prisma.phone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhoneDeleteManyArgs>(args?: SelectSubset<T, PhoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Phones
     * const phone = await prisma.phone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhoneUpdateManyArgs>(args: SelectSubset<T, PhoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phones and returns the data updated in the database.
     * @param {PhoneUpdateManyAndReturnArgs} args - Arguments to update many Phones.
     * @example
     * // Update many Phones
     * const phone = await prisma.phone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Phones and only return the `id`
     * const phoneWithIdOnly = await prisma.phone.updateManyAndReturn({
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
    updateManyAndReturn<T extends PhoneUpdateManyAndReturnArgs>(args: SelectSubset<T, PhoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Phone.
     * @param {PhoneUpsertArgs} args - Arguments to update or create a Phone.
     * @example
     * // Update or create a Phone
     * const phone = await prisma.phone.upsert({
     *   create: {
     *     // ... data to create a Phone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Phone we want to update
     *   }
     * })
     */
    upsert<T extends PhoneUpsertArgs>(args: SelectSubset<T, PhoneUpsertArgs<ExtArgs>>): Prisma__PhoneClient<$Result.GetResult<Prisma.$PhonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Phones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneCountArgs} args - Arguments to filter Phones to count.
     * @example
     * // Count the number of Phones
     * const count = await prisma.phone.count({
     *   where: {
     *     // ... the filter for the Phones we want to count
     *   }
     * })
    **/
    count<T extends PhoneCountArgs>(
      args?: Subset<T, PhoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Phone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhoneAggregateArgs>(args: Subset<T, PhoneAggregateArgs>): Prisma.PrismaPromise<GetPhoneAggregateType<T>>

    /**
     * Group by Phone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneGroupByArgs} args - Group by arguments.
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
      T extends PhoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhoneGroupByArgs['orderBy'] }
        : { orderBy?: PhoneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PhoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Phone model
   */
  readonly fields: PhoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Phone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Phone model
   */
  interface PhoneFieldRefs {
    readonly id: FieldRef<"Phone", 'Int'>
    readonly customerId: FieldRef<"Phone", 'BigInt'>
    readonly number: FieldRef<"Phone", 'String'>
    readonly type: FieldRef<"Phone", 'String'>
    readonly observations: FieldRef<"Phone", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Phone findUnique
   */
  export type PhoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * Filter, which Phone to fetch.
     */
    where: PhoneWhereUniqueInput
  }

  /**
   * Phone findUniqueOrThrow
   */
  export type PhoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * Filter, which Phone to fetch.
     */
    where: PhoneWhereUniqueInput
  }

  /**
   * Phone findFirst
   */
  export type PhoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * Filter, which Phone to fetch.
     */
    where?: PhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phones to fetch.
     */
    orderBy?: PhoneOrderByWithRelationInput | PhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phones.
     */
    cursor?: PhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phones.
     */
    distinct?: PhoneScalarFieldEnum | PhoneScalarFieldEnum[]
  }

  /**
   * Phone findFirstOrThrow
   */
  export type PhoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * Filter, which Phone to fetch.
     */
    where?: PhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phones to fetch.
     */
    orderBy?: PhoneOrderByWithRelationInput | PhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phones.
     */
    cursor?: PhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phones.
     */
    distinct?: PhoneScalarFieldEnum | PhoneScalarFieldEnum[]
  }

  /**
   * Phone findMany
   */
  export type PhoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * Filter, which Phones to fetch.
     */
    where?: PhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phones to fetch.
     */
    orderBy?: PhoneOrderByWithRelationInput | PhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Phones.
     */
    cursor?: PhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phones.
     */
    skip?: number
    distinct?: PhoneScalarFieldEnum | PhoneScalarFieldEnum[]
  }

  /**
   * Phone create
   */
  export type PhoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * The data needed to create a Phone.
     */
    data: XOR<PhoneCreateInput, PhoneUncheckedCreateInput>
  }

  /**
   * Phone createMany
   */
  export type PhoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Phones.
     */
    data: PhoneCreateManyInput | PhoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Phone createManyAndReturn
   */
  export type PhoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * The data used to create many Phones.
     */
    data: PhoneCreateManyInput | PhoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Phone update
   */
  export type PhoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * The data needed to update a Phone.
     */
    data: XOR<PhoneUpdateInput, PhoneUncheckedUpdateInput>
    /**
     * Choose, which Phone to update.
     */
    where: PhoneWhereUniqueInput
  }

  /**
   * Phone updateMany
   */
  export type PhoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Phones.
     */
    data: XOR<PhoneUpdateManyMutationInput, PhoneUncheckedUpdateManyInput>
    /**
     * Filter which Phones to update
     */
    where?: PhoneWhereInput
    /**
     * Limit how many Phones to update.
     */
    limit?: number
  }

  /**
   * Phone updateManyAndReturn
   */
  export type PhoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * The data used to update Phones.
     */
    data: XOR<PhoneUpdateManyMutationInput, PhoneUncheckedUpdateManyInput>
    /**
     * Filter which Phones to update
     */
    where?: PhoneWhereInput
    /**
     * Limit how many Phones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Phone upsert
   */
  export type PhoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * The filter to search for the Phone to update in case it exists.
     */
    where: PhoneWhereUniqueInput
    /**
     * In case the Phone found by the `where` argument doesn't exist, create a new Phone with this data.
     */
    create: XOR<PhoneCreateInput, PhoneUncheckedCreateInput>
    /**
     * In case the Phone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhoneUpdateInput, PhoneUncheckedUpdateInput>
  }

  /**
   * Phone delete
   */
  export type PhoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
    /**
     * Filter which Phone to delete.
     */
    where: PhoneWhereUniqueInput
  }

  /**
   * Phone deleteMany
   */
  export type PhoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phones to delete
     */
    where?: PhoneWhereInput
    /**
     * Limit how many Phones to delete.
     */
    limit?: number
  }

  /**
   * Phone without action
   */
  export type PhoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phone
     */
    select?: PhoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phone
     */
    omit?: PhoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenAvgAggregateOutputType = {
    customerId: number | null
  }

  export type RefreshTokenSumAggregateOutputType = {
    customerId: bigint | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    customerId: bigint | null
    expiresAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    customerId: bigint | null
    expiresAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    customerId: number
    expiresAt: number
    _all: number
  }


  export type RefreshTokenAvgAggregateInputType = {
    customerId?: true
  }

  export type RefreshTokenSumAggregateInputType = {
    customerId?: true
  }

  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    customerId?: true
    expiresAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    customerId?: true
    expiresAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    customerId?: true
    expiresAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefreshTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefreshTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _avg?: RefreshTokenAvgAggregateInputType
    _sum?: RefreshTokenSumAggregateInputType
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    customerId: bigint
    expiresAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    customerId?: boolean
    expiresAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    customerId?: boolean
    expiresAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    customerId?: boolean
    expiresAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    customerId?: boolean
    expiresAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "customerId" | "expiresAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      customerId: bigint
      expiresAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly customerId: FieldRef<"RefreshToken", 'BigInt'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
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
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    refresh_token_expires_in: 'refresh_token_expires_in'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    cpfCnpj: 'cpfCnpj',
    email: 'email',
    passwordHash: 'passwordHash',
    firstAccess: 'firstAccess',
    asaasCustomerId: 'asaasCustomerId',
    lastSyncAt: 'lastSyncAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const CustomerPlanScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    status: 'status',
    hasFinancialResp: 'hasFinancialResp',
    sector: 'sector',
    quadra: 'quadra',
    lote: 'lote'
  };

  export type CustomerPlanScalarFieldEnum = (typeof CustomerPlanScalarFieldEnum)[keyof typeof CustomerPlanScalarFieldEnum]


  export const FinancialResponsibleScalarFieldEnum: {
    id: 'id',
    customerPlanId: 'customerPlanId',
    name: 'name',
    cpfCnpj: 'cpfCnpj',
    email: 'email',
    phone: 'phone',
    payerCustomerId: 'payerCustomerId'
  };

  export type FinancialResponsibleScalarFieldEnum = (typeof FinancialResponsibleScalarFieldEnum)[keyof typeof FinancialResponsibleScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    dueDate: 'dueDate',
    value: 'value',
    status: 'status',
    paymentDate: 'paymentDate',
    receivedValue: 'receivedValue',
    discount: 'discount',
    interest: 'interest',
    paymentMode: 'paymentMode',
    bankId: 'bankId',
    ourNumber: 'ourNumber',
    installment: 'installment',
    paymentFormId: 'paymentFormId'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const PortalPaymentScalarFieldEnum: {
    id: 'id',
    invoiceId: 'invoiceId',
    customerId: 'customerId',
    asaasPaymentId: 'asaasPaymentId',
    paymentMethod: 'paymentMethod',
    status: 'status',
    invoiceUrl: 'invoiceUrl',
    bankSlipUrl: 'bankSlipUrl',
    pixCopyPaste: 'pixCopyPaste',
    value: 'value',
    netValue: 'netValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortalPaymentScalarFieldEnum = (typeof PortalPaymentScalarFieldEnum)[keyof typeof PortalPaymentScalarFieldEnum]


  export const ChangeRequestScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    type: 'type',
    oldData: 'oldData',
    newData: 'newData',
    status: 'status',
    reviewedBy: 'reviewedBy',
    createdAt: 'createdAt'
  };

  export type ChangeRequestScalarFieldEnum = (typeof ChangeRequestScalarFieldEnum)[keyof typeof ChangeRequestScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    street: 'street',
    number: 'number',
    complement: 'complement',
    neighborhood: 'neighborhood',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    isMain: 'isMain'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const PhoneScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    number: 'number',
    type: 'type',
    observations: 'observations'
  };

  export type PhoneScalarFieldEnum = (typeof PhoneScalarFieldEnum)[keyof typeof PhoneScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    customerId: 'customerId',
    expiresAt: 'expiresAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BoletoStatus'
   */
  export type EnumBoletoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BoletoStatus'>
    


  /**
   * Reference to a field of type 'BoletoStatus[]'
   */
  export type ListEnumBoletoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BoletoStatus[]'>
    


  /**
   * Reference to a field of type 'ChangeType'
   */
  export type EnumChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeType'>
    


  /**
   * Reference to a field of type 'ChangeType[]'
   */
  export type ListEnumChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


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
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    active?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: BigIntFilter<"Customer"> | bigint | number
    fullName?: StringFilter<"Customer"> | string
    cpfCnpj?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    passwordHash?: StringNullableFilter<"Customer"> | string | null
    firstAccess?: BoolFilter<"Customer"> | boolean
    asaasCustomerId?: StringNullableFilter<"Customer"> | string | null
    lastSyncAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    plans?: CustomerPlanListRelationFilter
    addresses?: AddressListRelationFilter
    phones?: PhoneListRelationFilter
    payments?: PortalPaymentListRelationFilter
    changeRequests?: ChangeRequestListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    financialResponsibleAsPayer?: FinancialResponsibleListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    cpfCnpj?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    firstAccess?: SortOrder
    asaasCustomerId?: SortOrderInput | SortOrder
    lastSyncAt?: SortOrder
    updatedAt?: SortOrder
    plans?: CustomerPlanOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    phones?: PhoneOrderByRelationAggregateInput
    payments?: PortalPaymentOrderByRelationAggregateInput
    changeRequests?: ChangeRequestOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    financialResponsibleAsPayer?: FinancialResponsibleOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    cpfCnpj?: string
    asaasCustomerId?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    fullName?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    passwordHash?: StringNullableFilter<"Customer"> | string | null
    firstAccess?: BoolFilter<"Customer"> | boolean
    lastSyncAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    plans?: CustomerPlanListRelationFilter
    addresses?: AddressListRelationFilter
    phones?: PhoneListRelationFilter
    payments?: PortalPaymentListRelationFilter
    changeRequests?: ChangeRequestListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    financialResponsibleAsPayer?: FinancialResponsibleListRelationFilter
  }, "id" | "cpfCnpj" | "asaasCustomerId">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    cpfCnpj?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    firstAccess?: SortOrder
    asaasCustomerId?: SortOrderInput | SortOrder
    lastSyncAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Customer"> | bigint | number
    fullName?: StringWithAggregatesFilter<"Customer"> | string
    cpfCnpj?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    firstAccess?: BoolWithAggregatesFilter<"Customer"> | boolean
    asaasCustomerId?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    lastSyncAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type CustomerPlanWhereInput = {
    AND?: CustomerPlanWhereInput | CustomerPlanWhereInput[]
    OR?: CustomerPlanWhereInput[]
    NOT?: CustomerPlanWhereInput | CustomerPlanWhereInput[]
    id?: BigIntFilter<"CustomerPlan"> | bigint | number
    customerId?: BigIntFilter<"CustomerPlan"> | bigint | number
    status?: StringNullableFilter<"CustomerPlan"> | string | null
    hasFinancialResp?: BoolFilter<"CustomerPlan"> | boolean
    sector?: StringNullableFilter<"CustomerPlan"> | string | null
    quadra?: StringNullableFilter<"CustomerPlan"> | string | null
    lote?: StringNullableFilter<"CustomerPlan"> | string | null
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    financialResponsible?: XOR<FinancialResponsibleNullableScalarRelationFilter, FinancialResponsibleWhereInput> | null
    invoices?: InvoiceListRelationFilter
  }

  export type CustomerPlanOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    status?: SortOrderInput | SortOrder
    hasFinancialResp?: SortOrder
    sector?: SortOrderInput | SortOrder
    quadra?: SortOrderInput | SortOrder
    lote?: SortOrderInput | SortOrder
    customer?: CustomerOrderByWithRelationInput
    financialResponsible?: FinancialResponsibleOrderByWithRelationInput
    invoices?: InvoiceOrderByRelationAggregateInput
  }

  export type CustomerPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: CustomerPlanWhereInput | CustomerPlanWhereInput[]
    OR?: CustomerPlanWhereInput[]
    NOT?: CustomerPlanWhereInput | CustomerPlanWhereInput[]
    customerId?: BigIntFilter<"CustomerPlan"> | bigint | number
    status?: StringNullableFilter<"CustomerPlan"> | string | null
    hasFinancialResp?: BoolFilter<"CustomerPlan"> | boolean
    sector?: StringNullableFilter<"CustomerPlan"> | string | null
    quadra?: StringNullableFilter<"CustomerPlan"> | string | null
    lote?: StringNullableFilter<"CustomerPlan"> | string | null
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    financialResponsible?: XOR<FinancialResponsibleNullableScalarRelationFilter, FinancialResponsibleWhereInput> | null
    invoices?: InvoiceListRelationFilter
  }, "id">

  export type CustomerPlanOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    status?: SortOrderInput | SortOrder
    hasFinancialResp?: SortOrder
    sector?: SortOrderInput | SortOrder
    quadra?: SortOrderInput | SortOrder
    lote?: SortOrderInput | SortOrder
    _count?: CustomerPlanCountOrderByAggregateInput
    _avg?: CustomerPlanAvgOrderByAggregateInput
    _max?: CustomerPlanMaxOrderByAggregateInput
    _min?: CustomerPlanMinOrderByAggregateInput
    _sum?: CustomerPlanSumOrderByAggregateInput
  }

  export type CustomerPlanScalarWhereWithAggregatesInput = {
    AND?: CustomerPlanScalarWhereWithAggregatesInput | CustomerPlanScalarWhereWithAggregatesInput[]
    OR?: CustomerPlanScalarWhereWithAggregatesInput[]
    NOT?: CustomerPlanScalarWhereWithAggregatesInput | CustomerPlanScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"CustomerPlan"> | bigint | number
    customerId?: BigIntWithAggregatesFilter<"CustomerPlan"> | bigint | number
    status?: StringNullableWithAggregatesFilter<"CustomerPlan"> | string | null
    hasFinancialResp?: BoolWithAggregatesFilter<"CustomerPlan"> | boolean
    sector?: StringNullableWithAggregatesFilter<"CustomerPlan"> | string | null
    quadra?: StringNullableWithAggregatesFilter<"CustomerPlan"> | string | null
    lote?: StringNullableWithAggregatesFilter<"CustomerPlan"> | string | null
  }

  export type FinancialResponsibleWhereInput = {
    AND?: FinancialResponsibleWhereInput | FinancialResponsibleWhereInput[]
    OR?: FinancialResponsibleWhereInput[]
    NOT?: FinancialResponsibleWhereInput | FinancialResponsibleWhereInput[]
    id?: BigIntFilter<"FinancialResponsible"> | bigint | number
    customerPlanId?: BigIntFilter<"FinancialResponsible"> | bigint | number
    name?: StringFilter<"FinancialResponsible"> | string
    cpfCnpj?: StringFilter<"FinancialResponsible"> | string
    email?: StringNullableFilter<"FinancialResponsible"> | string | null
    phone?: StringNullableFilter<"FinancialResponsible"> | string | null
    payerCustomerId?: BigIntNullableFilter<"FinancialResponsible"> | bigint | number | null
    plan?: XOR<CustomerPlanScalarRelationFilter, CustomerPlanWhereInput>
    payer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type FinancialResponsibleOrderByWithRelationInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    name?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    payerCustomerId?: SortOrderInput | SortOrder
    plan?: CustomerPlanOrderByWithRelationInput
    payer?: CustomerOrderByWithRelationInput
  }

  export type FinancialResponsibleWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    customerPlanId?: bigint | number
    AND?: FinancialResponsibleWhereInput | FinancialResponsibleWhereInput[]
    OR?: FinancialResponsibleWhereInput[]
    NOT?: FinancialResponsibleWhereInput | FinancialResponsibleWhereInput[]
    name?: StringFilter<"FinancialResponsible"> | string
    cpfCnpj?: StringFilter<"FinancialResponsible"> | string
    email?: StringNullableFilter<"FinancialResponsible"> | string | null
    phone?: StringNullableFilter<"FinancialResponsible"> | string | null
    payerCustomerId?: BigIntNullableFilter<"FinancialResponsible"> | bigint | number | null
    plan?: XOR<CustomerPlanScalarRelationFilter, CustomerPlanWhereInput>
    payer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id" | "customerPlanId">

  export type FinancialResponsibleOrderByWithAggregationInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    name?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    payerCustomerId?: SortOrderInput | SortOrder
    _count?: FinancialResponsibleCountOrderByAggregateInput
    _avg?: FinancialResponsibleAvgOrderByAggregateInput
    _max?: FinancialResponsibleMaxOrderByAggregateInput
    _min?: FinancialResponsibleMinOrderByAggregateInput
    _sum?: FinancialResponsibleSumOrderByAggregateInput
  }

  export type FinancialResponsibleScalarWhereWithAggregatesInput = {
    AND?: FinancialResponsibleScalarWhereWithAggregatesInput | FinancialResponsibleScalarWhereWithAggregatesInput[]
    OR?: FinancialResponsibleScalarWhereWithAggregatesInput[]
    NOT?: FinancialResponsibleScalarWhereWithAggregatesInput | FinancialResponsibleScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"FinancialResponsible"> | bigint | number
    customerPlanId?: BigIntWithAggregatesFilter<"FinancialResponsible"> | bigint | number
    name?: StringWithAggregatesFilter<"FinancialResponsible"> | string
    cpfCnpj?: StringWithAggregatesFilter<"FinancialResponsible"> | string
    email?: StringNullableWithAggregatesFilter<"FinancialResponsible"> | string | null
    phone?: StringNullableWithAggregatesFilter<"FinancialResponsible"> | string | null
    payerCustomerId?: BigIntNullableWithAggregatesFilter<"FinancialResponsible"> | bigint | number | null
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: BigIntFilter<"Invoice"> | bigint | number
    planId?: BigIntFilter<"Invoice"> | bigint | number
    dueDate?: DateTimeFilter<"Invoice"> | Date | string
    value?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFilter<"Invoice"> | $Enums.BoletoStatus
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    receivedValue?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    discount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    interest?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    paymentMode?: StringNullableFilter<"Invoice"> | string | null
    bankId?: StringNullableFilter<"Invoice"> | string | null
    ourNumber?: StringNullableFilter<"Invoice"> | string | null
    installment?: StringNullableFilter<"Invoice"> | string | null
    paymentFormId?: IntNullableFilter<"Invoice"> | number | null
    plan?: XOR<CustomerPlanScalarRelationFilter, CustomerPlanWhereInput>
    portalPayments?: PortalPaymentListRelationFilter
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    dueDate?: SortOrder
    value?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    receivedValue?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    interest?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    bankId?: SortOrderInput | SortOrder
    ourNumber?: SortOrderInput | SortOrder
    installment?: SortOrderInput | SortOrder
    paymentFormId?: SortOrderInput | SortOrder
    plan?: CustomerPlanOrderByWithRelationInput
    portalPayments?: PortalPaymentOrderByRelationAggregateInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    planId?: BigIntFilter<"Invoice"> | bigint | number
    dueDate?: DateTimeFilter<"Invoice"> | Date | string
    value?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFilter<"Invoice"> | $Enums.BoletoStatus
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    receivedValue?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    discount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    interest?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    paymentMode?: StringNullableFilter<"Invoice"> | string | null
    bankId?: StringNullableFilter<"Invoice"> | string | null
    ourNumber?: StringNullableFilter<"Invoice"> | string | null
    installment?: StringNullableFilter<"Invoice"> | string | null
    paymentFormId?: IntNullableFilter<"Invoice"> | number | null
    plan?: XOR<CustomerPlanScalarRelationFilter, CustomerPlanWhereInput>
    portalPayments?: PortalPaymentListRelationFilter
  }, "id">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    dueDate?: SortOrder
    value?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    receivedValue?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    interest?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    bankId?: SortOrderInput | SortOrder
    ourNumber?: SortOrderInput | SortOrder
    installment?: SortOrderInput | SortOrder
    paymentFormId?: SortOrderInput | SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Invoice"> | bigint | number
    planId?: BigIntWithAggregatesFilter<"Invoice"> | bigint | number
    dueDate?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    value?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusWithAggregatesFilter<"Invoice"> | $Enums.BoletoStatus
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    receivedValue?: DecimalNullableWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    discount?: DecimalNullableWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    interest?: DecimalNullableWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    paymentMode?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    bankId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    ourNumber?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    installment?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    paymentFormId?: IntNullableWithAggregatesFilter<"Invoice"> | number | null
  }

  export type PortalPaymentWhereInput = {
    AND?: PortalPaymentWhereInput | PortalPaymentWhereInput[]
    OR?: PortalPaymentWhereInput[]
    NOT?: PortalPaymentWhereInput | PortalPaymentWhereInput[]
    id?: StringFilter<"PortalPayment"> | string
    invoiceId?: BigIntNullableFilter<"PortalPayment"> | bigint | number | null
    customerId?: BigIntFilter<"PortalPayment"> | bigint | number
    asaasPaymentId?: StringFilter<"PortalPayment"> | string
    paymentMethod?: StringFilter<"PortalPayment"> | string
    status?: StringFilter<"PortalPayment"> | string
    invoiceUrl?: StringNullableFilter<"PortalPayment"> | string | null
    bankSlipUrl?: StringNullableFilter<"PortalPayment"> | string | null
    pixCopyPaste?: StringNullableFilter<"PortalPayment"> | string | null
    value?: DecimalFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string
    netValue?: DecimalNullableFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"PortalPayment"> | Date | string
    updatedAt?: DateTimeFilter<"PortalPayment"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    invoice?: XOR<InvoiceNullableScalarRelationFilter, InvoiceWhereInput> | null
  }

  export type PortalPaymentOrderByWithRelationInput = {
    id?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    customerId?: SortOrder
    asaasPaymentId?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    invoiceUrl?: SortOrderInput | SortOrder
    bankSlipUrl?: SortOrderInput | SortOrder
    pixCopyPaste?: SortOrderInput | SortOrder
    value?: SortOrder
    netValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    invoice?: InvoiceOrderByWithRelationInput
  }

  export type PortalPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    asaasPaymentId?: string
    AND?: PortalPaymentWhereInput | PortalPaymentWhereInput[]
    OR?: PortalPaymentWhereInput[]
    NOT?: PortalPaymentWhereInput | PortalPaymentWhereInput[]
    invoiceId?: BigIntNullableFilter<"PortalPayment"> | bigint | number | null
    customerId?: BigIntFilter<"PortalPayment"> | bigint | number
    paymentMethod?: StringFilter<"PortalPayment"> | string
    status?: StringFilter<"PortalPayment"> | string
    invoiceUrl?: StringNullableFilter<"PortalPayment"> | string | null
    bankSlipUrl?: StringNullableFilter<"PortalPayment"> | string | null
    pixCopyPaste?: StringNullableFilter<"PortalPayment"> | string | null
    value?: DecimalFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string
    netValue?: DecimalNullableFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"PortalPayment"> | Date | string
    updatedAt?: DateTimeFilter<"PortalPayment"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    invoice?: XOR<InvoiceNullableScalarRelationFilter, InvoiceWhereInput> | null
  }, "id" | "asaasPaymentId">

  export type PortalPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    customerId?: SortOrder
    asaasPaymentId?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    invoiceUrl?: SortOrderInput | SortOrder
    bankSlipUrl?: SortOrderInput | SortOrder
    pixCopyPaste?: SortOrderInput | SortOrder
    value?: SortOrder
    netValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortalPaymentCountOrderByAggregateInput
    _avg?: PortalPaymentAvgOrderByAggregateInput
    _max?: PortalPaymentMaxOrderByAggregateInput
    _min?: PortalPaymentMinOrderByAggregateInput
    _sum?: PortalPaymentSumOrderByAggregateInput
  }

  export type PortalPaymentScalarWhereWithAggregatesInput = {
    AND?: PortalPaymentScalarWhereWithAggregatesInput | PortalPaymentScalarWhereWithAggregatesInput[]
    OR?: PortalPaymentScalarWhereWithAggregatesInput[]
    NOT?: PortalPaymentScalarWhereWithAggregatesInput | PortalPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortalPayment"> | string
    invoiceId?: BigIntNullableWithAggregatesFilter<"PortalPayment"> | bigint | number | null
    customerId?: BigIntWithAggregatesFilter<"PortalPayment"> | bigint | number
    asaasPaymentId?: StringWithAggregatesFilter<"PortalPayment"> | string
    paymentMethod?: StringWithAggregatesFilter<"PortalPayment"> | string
    status?: StringWithAggregatesFilter<"PortalPayment"> | string
    invoiceUrl?: StringNullableWithAggregatesFilter<"PortalPayment"> | string | null
    bankSlipUrl?: StringNullableWithAggregatesFilter<"PortalPayment"> | string | null
    pixCopyPaste?: StringNullableWithAggregatesFilter<"PortalPayment"> | string | null
    value?: DecimalWithAggregatesFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string
    netValue?: DecimalNullableWithAggregatesFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PortalPayment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PortalPayment"> | Date | string
  }

  export type ChangeRequestWhereInput = {
    AND?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    OR?: ChangeRequestWhereInput[]
    NOT?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    id?: IntFilter<"ChangeRequest"> | number
    customerId?: BigIntFilter<"ChangeRequest"> | bigint | number
    type?: EnumChangeTypeFilter<"ChangeRequest"> | $Enums.ChangeType
    oldData?: JsonNullableFilter<"ChangeRequest">
    newData?: JsonFilter<"ChangeRequest">
    status?: EnumRequestStatusFilter<"ChangeRequest"> | $Enums.RequestStatus
    reviewedBy?: StringNullableFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeFilter<"ChangeRequest"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type ChangeRequestOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    oldData?: SortOrderInput | SortOrder
    newData?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type ChangeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    OR?: ChangeRequestWhereInput[]
    NOT?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    customerId?: BigIntFilter<"ChangeRequest"> | bigint | number
    type?: EnumChangeTypeFilter<"ChangeRequest"> | $Enums.ChangeType
    oldData?: JsonNullableFilter<"ChangeRequest">
    newData?: JsonFilter<"ChangeRequest">
    status?: EnumRequestStatusFilter<"ChangeRequest"> | $Enums.RequestStatus
    reviewedBy?: StringNullableFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeFilter<"ChangeRequest"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id">

  export type ChangeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    oldData?: SortOrderInput | SortOrder
    newData?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ChangeRequestCountOrderByAggregateInput
    _avg?: ChangeRequestAvgOrderByAggregateInput
    _max?: ChangeRequestMaxOrderByAggregateInput
    _min?: ChangeRequestMinOrderByAggregateInput
    _sum?: ChangeRequestSumOrderByAggregateInput
  }

  export type ChangeRequestScalarWhereWithAggregatesInput = {
    AND?: ChangeRequestScalarWhereWithAggregatesInput | ChangeRequestScalarWhereWithAggregatesInput[]
    OR?: ChangeRequestScalarWhereWithAggregatesInput[]
    NOT?: ChangeRequestScalarWhereWithAggregatesInput | ChangeRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChangeRequest"> | number
    customerId?: BigIntWithAggregatesFilter<"ChangeRequest"> | bigint | number
    type?: EnumChangeTypeWithAggregatesFilter<"ChangeRequest"> | $Enums.ChangeType
    oldData?: JsonNullableWithAggregatesFilter<"ChangeRequest">
    newData?: JsonWithAggregatesFilter<"ChangeRequest">
    status?: EnumRequestStatusWithAggregatesFilter<"ChangeRequest"> | $Enums.RequestStatus
    reviewedBy?: StringNullableWithAggregatesFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ChangeRequest"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: IntFilter<"Address"> | number
    customerId?: BigIntFilter<"Address"> | bigint | number
    street?: StringFilter<"Address"> | string
    number?: StringNullableFilter<"Address"> | string | null
    complement?: StringNullableFilter<"Address"> | string | null
    neighborhood?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    zipCode?: StringFilter<"Address"> | string
    isMain?: BoolFilter<"Address"> | boolean
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    street?: SortOrder
    number?: SortOrderInput | SortOrder
    complement?: SortOrderInput | SortOrder
    neighborhood?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    isMain?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    customerId?: BigIntFilter<"Address"> | bigint | number
    street?: StringFilter<"Address"> | string
    number?: StringNullableFilter<"Address"> | string | null
    complement?: StringNullableFilter<"Address"> | string | null
    neighborhood?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    zipCode?: StringFilter<"Address"> | string
    isMain?: BoolFilter<"Address"> | boolean
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    street?: SortOrder
    number?: SortOrderInput | SortOrder
    complement?: SortOrderInput | SortOrder
    neighborhood?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    isMain?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _avg?: AddressAvgOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
    _sum?: AddressSumOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Address"> | number
    customerId?: BigIntWithAggregatesFilter<"Address"> | bigint | number
    street?: StringWithAggregatesFilter<"Address"> | string
    number?: StringNullableWithAggregatesFilter<"Address"> | string | null
    complement?: StringNullableWithAggregatesFilter<"Address"> | string | null
    neighborhood?: StringNullableWithAggregatesFilter<"Address"> | string | null
    city?: StringWithAggregatesFilter<"Address"> | string
    state?: StringWithAggregatesFilter<"Address"> | string
    zipCode?: StringWithAggregatesFilter<"Address"> | string
    isMain?: BoolWithAggregatesFilter<"Address"> | boolean
  }

  export type PhoneWhereInput = {
    AND?: PhoneWhereInput | PhoneWhereInput[]
    OR?: PhoneWhereInput[]
    NOT?: PhoneWhereInput | PhoneWhereInput[]
    id?: IntFilter<"Phone"> | number
    customerId?: BigIntFilter<"Phone"> | bigint | number
    number?: StringFilter<"Phone"> | string
    type?: StringNullableFilter<"Phone"> | string | null
    observations?: StringNullableFilter<"Phone"> | string | null
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type PhoneOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    number?: SortOrder
    type?: SortOrderInput | SortOrder
    observations?: SortOrderInput | SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type PhoneWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PhoneWhereInput | PhoneWhereInput[]
    OR?: PhoneWhereInput[]
    NOT?: PhoneWhereInput | PhoneWhereInput[]
    customerId?: BigIntFilter<"Phone"> | bigint | number
    number?: StringFilter<"Phone"> | string
    type?: StringNullableFilter<"Phone"> | string | null
    observations?: StringNullableFilter<"Phone"> | string | null
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id">

  export type PhoneOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    number?: SortOrder
    type?: SortOrderInput | SortOrder
    observations?: SortOrderInput | SortOrder
    _count?: PhoneCountOrderByAggregateInput
    _avg?: PhoneAvgOrderByAggregateInput
    _max?: PhoneMaxOrderByAggregateInput
    _min?: PhoneMinOrderByAggregateInput
    _sum?: PhoneSumOrderByAggregateInput
  }

  export type PhoneScalarWhereWithAggregatesInput = {
    AND?: PhoneScalarWhereWithAggregatesInput | PhoneScalarWhereWithAggregatesInput[]
    OR?: PhoneScalarWhereWithAggregatesInput[]
    NOT?: PhoneScalarWhereWithAggregatesInput | PhoneScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Phone"> | number
    customerId?: BigIntWithAggregatesFilter<"Phone"> | bigint | number
    number?: StringWithAggregatesFilter<"Phone"> | string
    type?: StringNullableWithAggregatesFilter<"Phone"> | string | null
    observations?: StringNullableWithAggregatesFilter<"Phone"> | string | null
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    customerId?: BigIntFilter<"RefreshToken"> | bigint | number
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    customerId?: SortOrder
    expiresAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    customerId?: BigIntFilter<"RefreshToken"> | bigint | number
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    customerId?: SortOrder
    expiresAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _avg?: RefreshTokenAvgOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
    _sum?: RefreshTokenSumOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    customerId?: BigIntWithAggregatesFilter<"RefreshToken"> | bigint | number
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type CustomerCreateManyInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerPlanCreateInput = {
    id: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    customer: CustomerCreateNestedOneWithoutPlansInput
    financialResponsible?: FinancialResponsibleCreateNestedOneWithoutPlanInput
    invoices?: InvoiceCreateNestedManyWithoutPlanInput
  }

  export type CustomerPlanUncheckedCreateInput = {
    id: bigint | number
    customerId: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    financialResponsible?: FinancialResponsibleUncheckedCreateNestedOneWithoutPlanInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutPlanInput
  }

  export type CustomerPlanUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: CustomerUpdateOneRequiredWithoutPlansNestedInput
    financialResponsible?: FinancialResponsibleUpdateOneWithoutPlanNestedInput
    invoices?: InvoiceUpdateManyWithoutPlanNestedInput
  }

  export type CustomerPlanUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    financialResponsible?: FinancialResponsibleUncheckedUpdateOneWithoutPlanNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type CustomerPlanCreateManyInput = {
    id: bigint | number
    customerId: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
  }

  export type CustomerPlanUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerPlanUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FinancialResponsibleCreateInput = {
    id?: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
    plan: CustomerPlanCreateNestedOneWithoutFinancialResponsibleInput
    payer?: CustomerCreateNestedOneWithoutFinancialResponsibleAsPayerInput
  }

  export type FinancialResponsibleUncheckedCreateInput = {
    id?: bigint | number
    customerPlanId: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
    payerCustomerId?: bigint | number | null
  }

  export type FinancialResponsibleUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: CustomerPlanUpdateOneRequiredWithoutFinancialResponsibleNestedInput
    payer?: CustomerUpdateOneWithoutFinancialResponsibleAsPayerNestedInput
  }

  export type FinancialResponsibleUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerPlanId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    payerCustomerId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type FinancialResponsibleCreateManyInput = {
    id?: bigint | number
    customerPlanId: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
    payerCustomerId?: bigint | number | null
  }

  export type FinancialResponsibleUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FinancialResponsibleUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerPlanId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    payerCustomerId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type InvoiceCreateInput = {
    id: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
    plan: CustomerPlanCreateNestedOneWithoutInvoicesInput
    portalPayments?: PortalPaymentCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id: bigint | number
    planId: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
    portalPayments?: PortalPaymentUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
    plan?: CustomerPlanUpdateOneRequiredWithoutInvoicesNestedInput
    portalPayments?: PortalPaymentUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    planId?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
    portalPayments?: PortalPaymentUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceCreateManyInput = {
    id: bigint | number
    planId: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    planId?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PortalPaymentCreateInput = {
    id?: string
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutPaymentsInput
    invoice?: InvoiceCreateNestedOneWithoutPortalPaymentsInput
  }

  export type PortalPaymentUncheckedCreateInput = {
    id?: string
    invoiceId?: bigint | number | null
    customerId: bigint | number
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutPaymentsNestedInput
    invoice?: InvoiceUpdateOneWithoutPortalPaymentsNestedInput
  }

  export type PortalPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalPaymentCreateManyInput = {
    id?: string
    invoiceId?: bigint | number | null
    customerId: bigint | number
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestCreateInput = {
    type: $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    reviewedBy?: string | null
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutChangeRequestsInput
  }

  export type ChangeRequestUncheckedCreateInput = {
    id?: number
    customerId: bigint | number
    type: $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUpdateInput = {
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutChangeRequestsNestedInput
  }

  export type ChangeRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestCreateManyInput = {
    id?: number
    customerId: bigint | number
    type: $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUpdateManyMutationInput = {
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    street: string
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    isMain?: boolean
    customer: CustomerCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateInput = {
    id?: number
    customerId: bigint | number
    street: string
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    isMain?: boolean
  }

  export type AddressUpdateInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    customer?: CustomerUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AddressCreateManyInput = {
    id?: number
    customerId: bigint | number
    street: string
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    isMain?: boolean
  }

  export type AddressUpdateManyMutationInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PhoneCreateInput = {
    number: string
    type?: string | null
    observations?: string | null
    customer: CustomerCreateNestedOneWithoutPhonesInput
  }

  export type PhoneUncheckedCreateInput = {
    id?: number
    customerId: bigint | number
    number: string
    type?: string | null
    observations?: string | null
  }

  export type PhoneUpdateInput = {
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: CustomerUpdateOneRequiredWithoutPhonesNestedInput
  }

  export type PhoneUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhoneCreateManyInput = {
    id?: number
    customerId: bigint | number
    number: string
    type?: string | null
    observations?: string | null
  }

  export type PhoneUpdateManyMutationInput = {
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhoneUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    customer: CustomerCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    customerId: bigint | number
    expiresAt: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    customerId: bigint | number
    expiresAt: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
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

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type CustomerPlanListRelationFilter = {
    every?: CustomerPlanWhereInput
    some?: CustomerPlanWhereInput
    none?: CustomerPlanWhereInput
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type PhoneListRelationFilter = {
    every?: PhoneWhereInput
    some?: PhoneWhereInput
    none?: PhoneWhereInput
  }

  export type PortalPaymentListRelationFilter = {
    every?: PortalPaymentWhereInput
    some?: PortalPaymentWhereInput
    none?: PortalPaymentWhereInput
  }

  export type ChangeRequestListRelationFilter = {
    every?: ChangeRequestWhereInput
    some?: ChangeRequestWhereInput
    none?: ChangeRequestWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type FinancialResponsibleListRelationFilter = {
    every?: FinancialResponsibleWhereInput
    some?: FinancialResponsibleWhereInput
    none?: FinancialResponsibleWhereInput
  }

  export type CustomerPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortalPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChangeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FinancialResponsibleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstAccess?: SortOrder
    asaasCustomerId?: SortOrder
    lastSyncAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstAccess?: SortOrder
    asaasCustomerId?: SortOrder
    lastSyncAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstAccess?: SortOrder
    asaasCustomerId?: SortOrder
    lastSyncAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type FinancialResponsibleNullableScalarRelationFilter = {
    is?: FinancialResponsibleWhereInput | null
    isNot?: FinancialResponsibleWhereInput | null
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerPlanCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    hasFinancialResp?: SortOrder
    sector?: SortOrder
    quadra?: SortOrder
    lote?: SortOrder
  }

  export type CustomerPlanAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type CustomerPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    hasFinancialResp?: SortOrder
    sector?: SortOrder
    quadra?: SortOrder
    lote?: SortOrder
  }

  export type CustomerPlanMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    hasFinancialResp?: SortOrder
    sector?: SortOrder
    quadra?: SortOrder
    lote?: SortOrder
  }

  export type CustomerPlanSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type CustomerPlanScalarRelationFilter = {
    is?: CustomerPlanWhereInput
    isNot?: CustomerPlanWhereInput
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type FinancialResponsibleCountOrderByAggregateInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    name?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    payerCustomerId?: SortOrder
  }

  export type FinancialResponsibleAvgOrderByAggregateInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    payerCustomerId?: SortOrder
  }

  export type FinancialResponsibleMaxOrderByAggregateInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    name?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    payerCustomerId?: SortOrder
  }

  export type FinancialResponsibleMinOrderByAggregateInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    name?: SortOrder
    cpfCnpj?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    payerCustomerId?: SortOrder
  }

  export type FinancialResponsibleSumOrderByAggregateInput = {
    id?: SortOrder
    customerPlanId?: SortOrder
    payerCustomerId?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumBoletoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BoletoStatus | EnumBoletoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBoletoStatusFilter<$PrismaModel> | $Enums.BoletoStatus
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    dueDate?: SortOrder
    value?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    receivedValue?: SortOrder
    discount?: SortOrder
    interest?: SortOrder
    paymentMode?: SortOrder
    bankId?: SortOrder
    ourNumber?: SortOrder
    installment?: SortOrder
    paymentFormId?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    value?: SortOrder
    receivedValue?: SortOrder
    discount?: SortOrder
    interest?: SortOrder
    paymentFormId?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    dueDate?: SortOrder
    value?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    receivedValue?: SortOrder
    discount?: SortOrder
    interest?: SortOrder
    paymentMode?: SortOrder
    bankId?: SortOrder
    ourNumber?: SortOrder
    installment?: SortOrder
    paymentFormId?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    dueDate?: SortOrder
    value?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    receivedValue?: SortOrder
    discount?: SortOrder
    interest?: SortOrder
    paymentMode?: SortOrder
    bankId?: SortOrder
    ourNumber?: SortOrder
    installment?: SortOrder
    paymentFormId?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    value?: SortOrder
    receivedValue?: SortOrder
    discount?: SortOrder
    interest?: SortOrder
    paymentFormId?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumBoletoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BoletoStatus | EnumBoletoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBoletoStatusWithAggregatesFilter<$PrismaModel> | $Enums.BoletoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBoletoStatusFilter<$PrismaModel>
    _max?: NestedEnumBoletoStatusFilter<$PrismaModel>
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

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type InvoiceNullableScalarRelationFilter = {
    is?: InvoiceWhereInput | null
    isNot?: InvoiceWhereInput | null
  }

  export type PortalPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    customerId?: SortOrder
    asaasPaymentId?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    invoiceUrl?: SortOrder
    bankSlipUrl?: SortOrder
    pixCopyPaste?: SortOrder
    value?: SortOrder
    netValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalPaymentAvgOrderByAggregateInput = {
    invoiceId?: SortOrder
    customerId?: SortOrder
    value?: SortOrder
    netValue?: SortOrder
  }

  export type PortalPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    customerId?: SortOrder
    asaasPaymentId?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    invoiceUrl?: SortOrder
    bankSlipUrl?: SortOrder
    pixCopyPaste?: SortOrder
    value?: SortOrder
    netValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    customerId?: SortOrder
    asaasPaymentId?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    invoiceUrl?: SortOrder
    bankSlipUrl?: SortOrder
    pixCopyPaste?: SortOrder
    value?: SortOrder
    netValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalPaymentSumOrderByAggregateInput = {
    invoiceId?: SortOrder
    customerId?: SortOrder
    value?: SortOrder
    netValue?: SortOrder
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

  export type EnumChangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeType | EnumChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeTypeFilter<$PrismaModel> | $Enums.ChangeType
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

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type ChangeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    oldData?: SortOrder
    newData?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type ChangeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeRequestSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
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

  export type EnumChangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeType | EnumChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChangeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeTypeFilter<$PrismaModel>
    _max?: NestedEnumChangeTypeFilter<$PrismaModel>
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

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    isMain?: SortOrder
  }

  export type AddressAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    isMain?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    isMain?: SortOrder
  }

  export type AddressSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type PhoneCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    number?: SortOrder
    type?: SortOrder
    observations?: SortOrder
  }

  export type PhoneAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type PhoneMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    number?: SortOrder
    type?: SortOrder
    observations?: SortOrder
  }

  export type PhoneMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    number?: SortOrder
    type?: SortOrder
    observations?: SortOrder
  }

  export type PhoneSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    customerId?: SortOrder
    expiresAt?: SortOrder
  }

  export type RefreshTokenAvgOrderByAggregateInput = {
    customerId?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    customerId?: SortOrder
    expiresAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    customerId?: SortOrder
    expiresAt?: SortOrder
  }

  export type RefreshTokenSumOrderByAggregateInput = {
    customerId?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type CustomerPlanCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerPlanCreateWithoutCustomerInput, CustomerPlanUncheckedCreateWithoutCustomerInput> | CustomerPlanCreateWithoutCustomerInput[] | CustomerPlanUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutCustomerInput | CustomerPlanCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerPlanCreateManyCustomerInputEnvelope
    connect?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type PhoneCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PhoneCreateWithoutCustomerInput, PhoneUncheckedCreateWithoutCustomerInput> | PhoneCreateWithoutCustomerInput[] | PhoneUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PhoneCreateOrConnectWithoutCustomerInput | PhoneCreateOrConnectWithoutCustomerInput[]
    createMany?: PhoneCreateManyCustomerInputEnvelope
    connect?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
  }

  export type PortalPaymentCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PortalPaymentCreateWithoutCustomerInput, PortalPaymentUncheckedCreateWithoutCustomerInput> | PortalPaymentCreateWithoutCustomerInput[] | PortalPaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutCustomerInput | PortalPaymentCreateOrConnectWithoutCustomerInput[]
    createMany?: PortalPaymentCreateManyCustomerInputEnvelope
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
  }

  export type ChangeRequestCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ChangeRequestCreateWithoutCustomerInput, ChangeRequestUncheckedCreateWithoutCustomerInput> | ChangeRequestCreateWithoutCustomerInput[] | ChangeRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutCustomerInput | ChangeRequestCreateOrConnectWithoutCustomerInput[]
    createMany?: ChangeRequestCreateManyCustomerInputEnvelope
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RefreshTokenCreateWithoutCustomerInput, RefreshTokenUncheckedCreateWithoutCustomerInput> | RefreshTokenCreateWithoutCustomerInput[] | RefreshTokenUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutCustomerInput | RefreshTokenCreateOrConnectWithoutCustomerInput[]
    createMany?: RefreshTokenCreateManyCustomerInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type FinancialResponsibleCreateNestedManyWithoutPayerInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPayerInput, FinancialResponsibleUncheckedCreateWithoutPayerInput> | FinancialResponsibleCreateWithoutPayerInput[] | FinancialResponsibleUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPayerInput | FinancialResponsibleCreateOrConnectWithoutPayerInput[]
    createMany?: FinancialResponsibleCreateManyPayerInputEnvelope
    connect?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
  }

  export type CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerPlanCreateWithoutCustomerInput, CustomerPlanUncheckedCreateWithoutCustomerInput> | CustomerPlanCreateWithoutCustomerInput[] | CustomerPlanUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutCustomerInput | CustomerPlanCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerPlanCreateManyCustomerInputEnvelope
    connect?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type PhoneUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PhoneCreateWithoutCustomerInput, PhoneUncheckedCreateWithoutCustomerInput> | PhoneCreateWithoutCustomerInput[] | PhoneUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PhoneCreateOrConnectWithoutCustomerInput | PhoneCreateOrConnectWithoutCustomerInput[]
    createMany?: PhoneCreateManyCustomerInputEnvelope
    connect?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
  }

  export type PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PortalPaymentCreateWithoutCustomerInput, PortalPaymentUncheckedCreateWithoutCustomerInput> | PortalPaymentCreateWithoutCustomerInput[] | PortalPaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutCustomerInput | PortalPaymentCreateOrConnectWithoutCustomerInput[]
    createMany?: PortalPaymentCreateManyCustomerInputEnvelope
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
  }

  export type ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ChangeRequestCreateWithoutCustomerInput, ChangeRequestUncheckedCreateWithoutCustomerInput> | ChangeRequestCreateWithoutCustomerInput[] | ChangeRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutCustomerInput | ChangeRequestCreateOrConnectWithoutCustomerInput[]
    createMany?: ChangeRequestCreateManyCustomerInputEnvelope
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RefreshTokenCreateWithoutCustomerInput, RefreshTokenUncheckedCreateWithoutCustomerInput> | RefreshTokenCreateWithoutCustomerInput[] | RefreshTokenUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutCustomerInput | RefreshTokenCreateOrConnectWithoutCustomerInput[]
    createMany?: RefreshTokenCreateManyCustomerInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPayerInput, FinancialResponsibleUncheckedCreateWithoutPayerInput> | FinancialResponsibleCreateWithoutPayerInput[] | FinancialResponsibleUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPayerInput | FinancialResponsibleCreateOrConnectWithoutPayerInput[]
    createMany?: FinancialResponsibleCreateManyPayerInputEnvelope
    connect?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type CustomerPlanUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerPlanCreateWithoutCustomerInput, CustomerPlanUncheckedCreateWithoutCustomerInput> | CustomerPlanCreateWithoutCustomerInput[] | CustomerPlanUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutCustomerInput | CustomerPlanCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerPlanUpsertWithWhereUniqueWithoutCustomerInput | CustomerPlanUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerPlanCreateManyCustomerInputEnvelope
    set?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    disconnect?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    delete?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    connect?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    update?: CustomerPlanUpdateWithWhereUniqueWithoutCustomerInput | CustomerPlanUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerPlanUpdateManyWithWhereWithoutCustomerInput | CustomerPlanUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerPlanScalarWhereInput | CustomerPlanScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCustomerInput | AddressUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCustomerInput | AddressUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCustomerInput | AddressUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type PhoneUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PhoneCreateWithoutCustomerInput, PhoneUncheckedCreateWithoutCustomerInput> | PhoneCreateWithoutCustomerInput[] | PhoneUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PhoneCreateOrConnectWithoutCustomerInput | PhoneCreateOrConnectWithoutCustomerInput[]
    upsert?: PhoneUpsertWithWhereUniqueWithoutCustomerInput | PhoneUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PhoneCreateManyCustomerInputEnvelope
    set?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    disconnect?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    delete?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    connect?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    update?: PhoneUpdateWithWhereUniqueWithoutCustomerInput | PhoneUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PhoneUpdateManyWithWhereWithoutCustomerInput | PhoneUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PhoneScalarWhereInput | PhoneScalarWhereInput[]
  }

  export type PortalPaymentUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PortalPaymentCreateWithoutCustomerInput, PortalPaymentUncheckedCreateWithoutCustomerInput> | PortalPaymentCreateWithoutCustomerInput[] | PortalPaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutCustomerInput | PortalPaymentCreateOrConnectWithoutCustomerInput[]
    upsert?: PortalPaymentUpsertWithWhereUniqueWithoutCustomerInput | PortalPaymentUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PortalPaymentCreateManyCustomerInputEnvelope
    set?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    disconnect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    delete?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    update?: PortalPaymentUpdateWithWhereUniqueWithoutCustomerInput | PortalPaymentUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PortalPaymentUpdateManyWithWhereWithoutCustomerInput | PortalPaymentUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PortalPaymentScalarWhereInput | PortalPaymentScalarWhereInput[]
  }

  export type ChangeRequestUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ChangeRequestCreateWithoutCustomerInput, ChangeRequestUncheckedCreateWithoutCustomerInput> | ChangeRequestCreateWithoutCustomerInput[] | ChangeRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutCustomerInput | ChangeRequestCreateOrConnectWithoutCustomerInput[]
    upsert?: ChangeRequestUpsertWithWhereUniqueWithoutCustomerInput | ChangeRequestUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ChangeRequestCreateManyCustomerInputEnvelope
    set?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    disconnect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    delete?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    update?: ChangeRequestUpdateWithWhereUniqueWithoutCustomerInput | ChangeRequestUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ChangeRequestUpdateManyWithWhereWithoutCustomerInput | ChangeRequestUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutCustomerInput, RefreshTokenUncheckedCreateWithoutCustomerInput> | RefreshTokenCreateWithoutCustomerInput[] | RefreshTokenUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutCustomerInput | RefreshTokenCreateOrConnectWithoutCustomerInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutCustomerInput | RefreshTokenUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RefreshTokenCreateManyCustomerInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutCustomerInput | RefreshTokenUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutCustomerInput | RefreshTokenUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type FinancialResponsibleUpdateManyWithoutPayerNestedInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPayerInput, FinancialResponsibleUncheckedCreateWithoutPayerInput> | FinancialResponsibleCreateWithoutPayerInput[] | FinancialResponsibleUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPayerInput | FinancialResponsibleCreateOrConnectWithoutPayerInput[]
    upsert?: FinancialResponsibleUpsertWithWhereUniqueWithoutPayerInput | FinancialResponsibleUpsertWithWhereUniqueWithoutPayerInput[]
    createMany?: FinancialResponsibleCreateManyPayerInputEnvelope
    set?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    disconnect?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    delete?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    connect?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    update?: FinancialResponsibleUpdateWithWhereUniqueWithoutPayerInput | FinancialResponsibleUpdateWithWhereUniqueWithoutPayerInput[]
    updateMany?: FinancialResponsibleUpdateManyWithWhereWithoutPayerInput | FinancialResponsibleUpdateManyWithWhereWithoutPayerInput[]
    deleteMany?: FinancialResponsibleScalarWhereInput | FinancialResponsibleScalarWhereInput[]
  }

  export type CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerPlanCreateWithoutCustomerInput, CustomerPlanUncheckedCreateWithoutCustomerInput> | CustomerPlanCreateWithoutCustomerInput[] | CustomerPlanUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutCustomerInput | CustomerPlanCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerPlanUpsertWithWhereUniqueWithoutCustomerInput | CustomerPlanUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerPlanCreateManyCustomerInputEnvelope
    set?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    disconnect?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    delete?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    connect?: CustomerPlanWhereUniqueInput | CustomerPlanWhereUniqueInput[]
    update?: CustomerPlanUpdateWithWhereUniqueWithoutCustomerInput | CustomerPlanUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerPlanUpdateManyWithWhereWithoutCustomerInput | CustomerPlanUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerPlanScalarWhereInput | CustomerPlanScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCustomerInput | AddressUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCustomerInput | AddressUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCustomerInput | AddressUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type PhoneUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PhoneCreateWithoutCustomerInput, PhoneUncheckedCreateWithoutCustomerInput> | PhoneCreateWithoutCustomerInput[] | PhoneUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PhoneCreateOrConnectWithoutCustomerInput | PhoneCreateOrConnectWithoutCustomerInput[]
    upsert?: PhoneUpsertWithWhereUniqueWithoutCustomerInput | PhoneUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PhoneCreateManyCustomerInputEnvelope
    set?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    disconnect?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    delete?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    connect?: PhoneWhereUniqueInput | PhoneWhereUniqueInput[]
    update?: PhoneUpdateWithWhereUniqueWithoutCustomerInput | PhoneUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PhoneUpdateManyWithWhereWithoutCustomerInput | PhoneUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PhoneScalarWhereInput | PhoneScalarWhereInput[]
  }

  export type PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PortalPaymentCreateWithoutCustomerInput, PortalPaymentUncheckedCreateWithoutCustomerInput> | PortalPaymentCreateWithoutCustomerInput[] | PortalPaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutCustomerInput | PortalPaymentCreateOrConnectWithoutCustomerInput[]
    upsert?: PortalPaymentUpsertWithWhereUniqueWithoutCustomerInput | PortalPaymentUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PortalPaymentCreateManyCustomerInputEnvelope
    set?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    disconnect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    delete?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    update?: PortalPaymentUpdateWithWhereUniqueWithoutCustomerInput | PortalPaymentUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PortalPaymentUpdateManyWithWhereWithoutCustomerInput | PortalPaymentUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PortalPaymentScalarWhereInput | PortalPaymentScalarWhereInput[]
  }

  export type ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ChangeRequestCreateWithoutCustomerInput, ChangeRequestUncheckedCreateWithoutCustomerInput> | ChangeRequestCreateWithoutCustomerInput[] | ChangeRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutCustomerInput | ChangeRequestCreateOrConnectWithoutCustomerInput[]
    upsert?: ChangeRequestUpsertWithWhereUniqueWithoutCustomerInput | ChangeRequestUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ChangeRequestCreateManyCustomerInputEnvelope
    set?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    disconnect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    delete?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    update?: ChangeRequestUpdateWithWhereUniqueWithoutCustomerInput | ChangeRequestUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ChangeRequestUpdateManyWithWhereWithoutCustomerInput | ChangeRequestUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutCustomerInput, RefreshTokenUncheckedCreateWithoutCustomerInput> | RefreshTokenCreateWithoutCustomerInput[] | RefreshTokenUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutCustomerInput | RefreshTokenCreateOrConnectWithoutCustomerInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutCustomerInput | RefreshTokenUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RefreshTokenCreateManyCustomerInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutCustomerInput | RefreshTokenUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutCustomerInput | RefreshTokenUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPayerInput, FinancialResponsibleUncheckedCreateWithoutPayerInput> | FinancialResponsibleCreateWithoutPayerInput[] | FinancialResponsibleUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPayerInput | FinancialResponsibleCreateOrConnectWithoutPayerInput[]
    upsert?: FinancialResponsibleUpsertWithWhereUniqueWithoutPayerInput | FinancialResponsibleUpsertWithWhereUniqueWithoutPayerInput[]
    createMany?: FinancialResponsibleCreateManyPayerInputEnvelope
    set?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    disconnect?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    delete?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    connect?: FinancialResponsibleWhereUniqueInput | FinancialResponsibleWhereUniqueInput[]
    update?: FinancialResponsibleUpdateWithWhereUniqueWithoutPayerInput | FinancialResponsibleUpdateWithWhereUniqueWithoutPayerInput[]
    updateMany?: FinancialResponsibleUpdateManyWithWhereWithoutPayerInput | FinancialResponsibleUpdateManyWithWhereWithoutPayerInput[]
    deleteMany?: FinancialResponsibleScalarWhereInput | FinancialResponsibleScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutPlansInput = {
    create?: XOR<CustomerCreateWithoutPlansInput, CustomerUncheckedCreateWithoutPlansInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPlansInput
    connect?: CustomerWhereUniqueInput
  }

  export type FinancialResponsibleCreateNestedOneWithoutPlanInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPlanInput, FinancialResponsibleUncheckedCreateWithoutPlanInput>
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPlanInput
    connect?: FinancialResponsibleWhereUniqueInput
  }

  export type InvoiceCreateNestedManyWithoutPlanInput = {
    create?: XOR<InvoiceCreateWithoutPlanInput, InvoiceUncheckedCreateWithoutPlanInput> | InvoiceCreateWithoutPlanInput[] | InvoiceUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutPlanInput | InvoiceCreateOrConnectWithoutPlanInput[]
    createMany?: InvoiceCreateManyPlanInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type FinancialResponsibleUncheckedCreateNestedOneWithoutPlanInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPlanInput, FinancialResponsibleUncheckedCreateWithoutPlanInput>
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPlanInput
    connect?: FinancialResponsibleWhereUniqueInput
  }

  export type InvoiceUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<InvoiceCreateWithoutPlanInput, InvoiceUncheckedCreateWithoutPlanInput> | InvoiceCreateWithoutPlanInput[] | InvoiceUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutPlanInput | InvoiceCreateOrConnectWithoutPlanInput[]
    createMany?: InvoiceCreateManyPlanInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type CustomerUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<CustomerCreateWithoutPlansInput, CustomerUncheckedCreateWithoutPlansInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPlansInput
    upsert?: CustomerUpsertWithoutPlansInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPlansInput, CustomerUpdateWithoutPlansInput>, CustomerUncheckedUpdateWithoutPlansInput>
  }

  export type FinancialResponsibleUpdateOneWithoutPlanNestedInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPlanInput, FinancialResponsibleUncheckedCreateWithoutPlanInput>
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPlanInput
    upsert?: FinancialResponsibleUpsertWithoutPlanInput
    disconnect?: FinancialResponsibleWhereInput | boolean
    delete?: FinancialResponsibleWhereInput | boolean
    connect?: FinancialResponsibleWhereUniqueInput
    update?: XOR<XOR<FinancialResponsibleUpdateToOneWithWhereWithoutPlanInput, FinancialResponsibleUpdateWithoutPlanInput>, FinancialResponsibleUncheckedUpdateWithoutPlanInput>
  }

  export type InvoiceUpdateManyWithoutPlanNestedInput = {
    create?: XOR<InvoiceCreateWithoutPlanInput, InvoiceUncheckedCreateWithoutPlanInput> | InvoiceCreateWithoutPlanInput[] | InvoiceUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutPlanInput | InvoiceCreateOrConnectWithoutPlanInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutPlanInput | InvoiceUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: InvoiceCreateManyPlanInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutPlanInput | InvoiceUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutPlanInput | InvoiceUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type FinancialResponsibleUncheckedUpdateOneWithoutPlanNestedInput = {
    create?: XOR<FinancialResponsibleCreateWithoutPlanInput, FinancialResponsibleUncheckedCreateWithoutPlanInput>
    connectOrCreate?: FinancialResponsibleCreateOrConnectWithoutPlanInput
    upsert?: FinancialResponsibleUpsertWithoutPlanInput
    disconnect?: FinancialResponsibleWhereInput | boolean
    delete?: FinancialResponsibleWhereInput | boolean
    connect?: FinancialResponsibleWhereUniqueInput
    update?: XOR<XOR<FinancialResponsibleUpdateToOneWithWhereWithoutPlanInput, FinancialResponsibleUpdateWithoutPlanInput>, FinancialResponsibleUncheckedUpdateWithoutPlanInput>
  }

  export type InvoiceUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<InvoiceCreateWithoutPlanInput, InvoiceUncheckedCreateWithoutPlanInput> | InvoiceCreateWithoutPlanInput[] | InvoiceUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutPlanInput | InvoiceCreateOrConnectWithoutPlanInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutPlanInput | InvoiceUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: InvoiceCreateManyPlanInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutPlanInput | InvoiceUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutPlanInput | InvoiceUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type CustomerPlanCreateNestedOneWithoutFinancialResponsibleInput = {
    create?: XOR<CustomerPlanCreateWithoutFinancialResponsibleInput, CustomerPlanUncheckedCreateWithoutFinancialResponsibleInput>
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutFinancialResponsibleInput
    connect?: CustomerPlanWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutFinancialResponsibleAsPayerInput = {
    create?: XOR<CustomerCreateWithoutFinancialResponsibleAsPayerInput, CustomerUncheckedCreateWithoutFinancialResponsibleAsPayerInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutFinancialResponsibleAsPayerInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerPlanUpdateOneRequiredWithoutFinancialResponsibleNestedInput = {
    create?: XOR<CustomerPlanCreateWithoutFinancialResponsibleInput, CustomerPlanUncheckedCreateWithoutFinancialResponsibleInput>
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutFinancialResponsibleInput
    upsert?: CustomerPlanUpsertWithoutFinancialResponsibleInput
    connect?: CustomerPlanWhereUniqueInput
    update?: XOR<XOR<CustomerPlanUpdateToOneWithWhereWithoutFinancialResponsibleInput, CustomerPlanUpdateWithoutFinancialResponsibleInput>, CustomerPlanUncheckedUpdateWithoutFinancialResponsibleInput>
  }

  export type CustomerUpdateOneWithoutFinancialResponsibleAsPayerNestedInput = {
    create?: XOR<CustomerCreateWithoutFinancialResponsibleAsPayerInput, CustomerUncheckedCreateWithoutFinancialResponsibleAsPayerInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutFinancialResponsibleAsPayerInput
    upsert?: CustomerUpsertWithoutFinancialResponsibleAsPayerInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutFinancialResponsibleAsPayerInput, CustomerUpdateWithoutFinancialResponsibleAsPayerInput>, CustomerUncheckedUpdateWithoutFinancialResponsibleAsPayerInput>
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type CustomerPlanCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<CustomerPlanCreateWithoutInvoicesInput, CustomerPlanUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutInvoicesInput
    connect?: CustomerPlanWhereUniqueInput
  }

  export type PortalPaymentCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<PortalPaymentCreateWithoutInvoiceInput, PortalPaymentUncheckedCreateWithoutInvoiceInput> | PortalPaymentCreateWithoutInvoiceInput[] | PortalPaymentUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutInvoiceInput | PortalPaymentCreateOrConnectWithoutInvoiceInput[]
    createMany?: PortalPaymentCreateManyInvoiceInputEnvelope
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
  }

  export type PortalPaymentUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<PortalPaymentCreateWithoutInvoiceInput, PortalPaymentUncheckedCreateWithoutInvoiceInput> | PortalPaymentCreateWithoutInvoiceInput[] | PortalPaymentUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutInvoiceInput | PortalPaymentCreateOrConnectWithoutInvoiceInput[]
    createMany?: PortalPaymentCreateManyInvoiceInputEnvelope
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumBoletoStatusFieldUpdateOperationsInput = {
    set?: $Enums.BoletoStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CustomerPlanUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<CustomerPlanCreateWithoutInvoicesInput, CustomerPlanUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: CustomerPlanCreateOrConnectWithoutInvoicesInput
    upsert?: CustomerPlanUpsertWithoutInvoicesInput
    connect?: CustomerPlanWhereUniqueInput
    update?: XOR<XOR<CustomerPlanUpdateToOneWithWhereWithoutInvoicesInput, CustomerPlanUpdateWithoutInvoicesInput>, CustomerPlanUncheckedUpdateWithoutInvoicesInput>
  }

  export type PortalPaymentUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<PortalPaymentCreateWithoutInvoiceInput, PortalPaymentUncheckedCreateWithoutInvoiceInput> | PortalPaymentCreateWithoutInvoiceInput[] | PortalPaymentUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutInvoiceInput | PortalPaymentCreateOrConnectWithoutInvoiceInput[]
    upsert?: PortalPaymentUpsertWithWhereUniqueWithoutInvoiceInput | PortalPaymentUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: PortalPaymentCreateManyInvoiceInputEnvelope
    set?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    disconnect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    delete?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    update?: PortalPaymentUpdateWithWhereUniqueWithoutInvoiceInput | PortalPaymentUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: PortalPaymentUpdateManyWithWhereWithoutInvoiceInput | PortalPaymentUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: PortalPaymentScalarWhereInput | PortalPaymentScalarWhereInput[]
  }

  export type PortalPaymentUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<PortalPaymentCreateWithoutInvoiceInput, PortalPaymentUncheckedCreateWithoutInvoiceInput> | PortalPaymentCreateWithoutInvoiceInput[] | PortalPaymentUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: PortalPaymentCreateOrConnectWithoutInvoiceInput | PortalPaymentCreateOrConnectWithoutInvoiceInput[]
    upsert?: PortalPaymentUpsertWithWhereUniqueWithoutInvoiceInput | PortalPaymentUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: PortalPaymentCreateManyInvoiceInputEnvelope
    set?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    disconnect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    delete?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    connect?: PortalPaymentWhereUniqueInput | PortalPaymentWhereUniqueInput[]
    update?: PortalPaymentUpdateWithWhereUniqueWithoutInvoiceInput | PortalPaymentUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: PortalPaymentUpdateManyWithWhereWithoutInvoiceInput | PortalPaymentUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: PortalPaymentScalarWhereInput | PortalPaymentScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPaymentsInput
    connect?: CustomerWhereUniqueInput
  }

  export type InvoiceCreateNestedOneWithoutPortalPaymentsInput = {
    create?: XOR<InvoiceCreateWithoutPortalPaymentsInput, InvoiceUncheckedCreateWithoutPortalPaymentsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPortalPaymentsInput
    connect?: InvoiceWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPaymentsInput
    upsert?: CustomerUpsertWithoutPaymentsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPaymentsInput, CustomerUpdateWithoutPaymentsInput>, CustomerUncheckedUpdateWithoutPaymentsInput>
  }

  export type InvoiceUpdateOneWithoutPortalPaymentsNestedInput = {
    create?: XOR<InvoiceCreateWithoutPortalPaymentsInput, InvoiceUncheckedCreateWithoutPortalPaymentsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPortalPaymentsInput
    upsert?: InvoiceUpsertWithoutPortalPaymentsInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutPortalPaymentsInput, InvoiceUpdateWithoutPortalPaymentsInput>, InvoiceUncheckedUpdateWithoutPortalPaymentsInput>
  }

  export type CustomerCreateNestedOneWithoutChangeRequestsInput = {
    create?: XOR<CustomerCreateWithoutChangeRequestsInput, CustomerUncheckedCreateWithoutChangeRequestsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutChangeRequestsInput
    connect?: CustomerWhereUniqueInput
  }

  export type EnumChangeTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChangeType
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type CustomerUpdateOneRequiredWithoutChangeRequestsNestedInput = {
    create?: XOR<CustomerCreateWithoutChangeRequestsInput, CustomerUncheckedCreateWithoutChangeRequestsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutChangeRequestsInput
    upsert?: CustomerUpsertWithoutChangeRequestsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutChangeRequestsInput, CustomerUpdateWithoutChangeRequestsInput>, CustomerUncheckedUpdateWithoutChangeRequestsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CustomerCreateNestedOneWithoutAddressesInput = {
    create?: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAddressesInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAddressesInput
    upsert?: CustomerUpsertWithoutAddressesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutAddressesInput, CustomerUpdateWithoutAddressesInput>, CustomerUncheckedUpdateWithoutAddressesInput>
  }

  export type CustomerCreateNestedOneWithoutPhonesInput = {
    create?: XOR<CustomerCreateWithoutPhonesInput, CustomerUncheckedCreateWithoutPhonesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPhonesInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutPhonesNestedInput = {
    create?: XOR<CustomerCreateWithoutPhonesInput, CustomerUncheckedCreateWithoutPhonesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPhonesInput
    upsert?: CustomerUpsertWithoutPhonesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPhonesInput, CustomerUpdateWithoutPhonesInput>, CustomerUncheckedUpdateWithoutPhonesInput>
  }

  export type CustomerCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<CustomerCreateWithoutRefreshTokensInput, CustomerUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRefreshTokensInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<CustomerCreateWithoutRefreshTokensInput, CustomerUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRefreshTokensInput
    upsert?: CustomerUpsertWithoutRefreshTokensInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutRefreshTokensInput, CustomerUpdateWithoutRefreshTokensInput>, CustomerUncheckedUpdateWithoutRefreshTokensInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumBoletoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BoletoStatus | EnumBoletoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBoletoStatusFilter<$PrismaModel> | $Enums.BoletoStatus
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumBoletoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BoletoStatus | EnumBoletoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoletoStatus[] | ListEnumBoletoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBoletoStatusWithAggregatesFilter<$PrismaModel> | $Enums.BoletoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBoletoStatusFilter<$PrismaModel>
    _max?: NestedEnumBoletoStatusFilter<$PrismaModel>
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumChangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeType | EnumChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeTypeFilter<$PrismaModel> | $Enums.ChangeType
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
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

  export type NestedEnumChangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeType | EnumChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeType[] | ListEnumChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChangeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeTypeFilter<$PrismaModel>
    _max?: NestedEnumChangeTypeFilter<$PrismaModel>
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

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CustomerPlanCreateWithoutCustomerInput = {
    id: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    financialResponsible?: FinancialResponsibleCreateNestedOneWithoutPlanInput
    invoices?: InvoiceCreateNestedManyWithoutPlanInput
  }

  export type CustomerPlanUncheckedCreateWithoutCustomerInput = {
    id: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    financialResponsible?: FinancialResponsibleUncheckedCreateNestedOneWithoutPlanInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutPlanInput
  }

  export type CustomerPlanCreateOrConnectWithoutCustomerInput = {
    where: CustomerPlanWhereUniqueInput
    create: XOR<CustomerPlanCreateWithoutCustomerInput, CustomerPlanUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerPlanCreateManyCustomerInputEnvelope = {
    data: CustomerPlanCreateManyCustomerInput | CustomerPlanCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutCustomerInput = {
    street: string
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    isMain?: boolean
  }

  export type AddressUncheckedCreateWithoutCustomerInput = {
    id?: number
    street: string
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    isMain?: boolean
  }

  export type AddressCreateOrConnectWithoutCustomerInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput>
  }

  export type AddressCreateManyCustomerInputEnvelope = {
    data: AddressCreateManyCustomerInput | AddressCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type PhoneCreateWithoutCustomerInput = {
    number: string
    type?: string | null
    observations?: string | null
  }

  export type PhoneUncheckedCreateWithoutCustomerInput = {
    id?: number
    number: string
    type?: string | null
    observations?: string | null
  }

  export type PhoneCreateOrConnectWithoutCustomerInput = {
    where: PhoneWhereUniqueInput
    create: XOR<PhoneCreateWithoutCustomerInput, PhoneUncheckedCreateWithoutCustomerInput>
  }

  export type PhoneCreateManyCustomerInputEnvelope = {
    data: PhoneCreateManyCustomerInput | PhoneCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type PortalPaymentCreateWithoutCustomerInput = {
    id?: string
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutPortalPaymentsInput
  }

  export type PortalPaymentUncheckedCreateWithoutCustomerInput = {
    id?: string
    invoiceId?: bigint | number | null
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalPaymentCreateOrConnectWithoutCustomerInput = {
    where: PortalPaymentWhereUniqueInput
    create: XOR<PortalPaymentCreateWithoutCustomerInput, PortalPaymentUncheckedCreateWithoutCustomerInput>
  }

  export type PortalPaymentCreateManyCustomerInputEnvelope = {
    data: PortalPaymentCreateManyCustomerInput | PortalPaymentCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type ChangeRequestCreateWithoutCustomerInput = {
    type: $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUncheckedCreateWithoutCustomerInput = {
    id?: number
    type: $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestCreateOrConnectWithoutCustomerInput = {
    where: ChangeRequestWhereUniqueInput
    create: XOR<ChangeRequestCreateWithoutCustomerInput, ChangeRequestUncheckedCreateWithoutCustomerInput>
  }

  export type ChangeRequestCreateManyCustomerInputEnvelope = {
    data: ChangeRequestCreateManyCustomerInput | ChangeRequestCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutCustomerInput = {
    id?: string
    token: string
    expiresAt: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutCustomerInput = {
    id?: string
    token: string
    expiresAt: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutCustomerInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutCustomerInput, RefreshTokenUncheckedCreateWithoutCustomerInput>
  }

  export type RefreshTokenCreateManyCustomerInputEnvelope = {
    data: RefreshTokenCreateManyCustomerInput | RefreshTokenCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type FinancialResponsibleCreateWithoutPayerInput = {
    id?: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
    plan: CustomerPlanCreateNestedOneWithoutFinancialResponsibleInput
  }

  export type FinancialResponsibleUncheckedCreateWithoutPayerInput = {
    id?: bigint | number
    customerPlanId: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
  }

  export type FinancialResponsibleCreateOrConnectWithoutPayerInput = {
    where: FinancialResponsibleWhereUniqueInput
    create: XOR<FinancialResponsibleCreateWithoutPayerInput, FinancialResponsibleUncheckedCreateWithoutPayerInput>
  }

  export type FinancialResponsibleCreateManyPayerInputEnvelope = {
    data: FinancialResponsibleCreateManyPayerInput | FinancialResponsibleCreateManyPayerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerPlanUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerPlanWhereUniqueInput
    update: XOR<CustomerPlanUpdateWithoutCustomerInput, CustomerPlanUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerPlanCreateWithoutCustomerInput, CustomerPlanUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerPlanUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerPlanWhereUniqueInput
    data: XOR<CustomerPlanUpdateWithoutCustomerInput, CustomerPlanUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerPlanUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerPlanScalarWhereInput
    data: XOR<CustomerPlanUpdateManyMutationInput, CustomerPlanUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerPlanScalarWhereInput = {
    AND?: CustomerPlanScalarWhereInput | CustomerPlanScalarWhereInput[]
    OR?: CustomerPlanScalarWhereInput[]
    NOT?: CustomerPlanScalarWhereInput | CustomerPlanScalarWhereInput[]
    id?: BigIntFilter<"CustomerPlan"> | bigint | number
    customerId?: BigIntFilter<"CustomerPlan"> | bigint | number
    status?: StringNullableFilter<"CustomerPlan"> | string | null
    hasFinancialResp?: BoolFilter<"CustomerPlan"> | boolean
    sector?: StringNullableFilter<"CustomerPlan"> | string | null
    quadra?: StringNullableFilter<"CustomerPlan"> | string | null
    lote?: StringNullableFilter<"CustomerPlan"> | string | null
  }

  export type AddressUpsertWithWhereUniqueWithoutCustomerInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutCustomerInput, AddressUncheckedUpdateWithoutCustomerInput>
    create: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutCustomerInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutCustomerInput, AddressUncheckedUpdateWithoutCustomerInput>
  }

  export type AddressUpdateManyWithWhereWithoutCustomerInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutCustomerInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: IntFilter<"Address"> | number
    customerId?: BigIntFilter<"Address"> | bigint | number
    street?: StringFilter<"Address"> | string
    number?: StringNullableFilter<"Address"> | string | null
    complement?: StringNullableFilter<"Address"> | string | null
    neighborhood?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    zipCode?: StringFilter<"Address"> | string
    isMain?: BoolFilter<"Address"> | boolean
  }

  export type PhoneUpsertWithWhereUniqueWithoutCustomerInput = {
    where: PhoneWhereUniqueInput
    update: XOR<PhoneUpdateWithoutCustomerInput, PhoneUncheckedUpdateWithoutCustomerInput>
    create: XOR<PhoneCreateWithoutCustomerInput, PhoneUncheckedCreateWithoutCustomerInput>
  }

  export type PhoneUpdateWithWhereUniqueWithoutCustomerInput = {
    where: PhoneWhereUniqueInput
    data: XOR<PhoneUpdateWithoutCustomerInput, PhoneUncheckedUpdateWithoutCustomerInput>
  }

  export type PhoneUpdateManyWithWhereWithoutCustomerInput = {
    where: PhoneScalarWhereInput
    data: XOR<PhoneUpdateManyMutationInput, PhoneUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PhoneScalarWhereInput = {
    AND?: PhoneScalarWhereInput | PhoneScalarWhereInput[]
    OR?: PhoneScalarWhereInput[]
    NOT?: PhoneScalarWhereInput | PhoneScalarWhereInput[]
    id?: IntFilter<"Phone"> | number
    customerId?: BigIntFilter<"Phone"> | bigint | number
    number?: StringFilter<"Phone"> | string
    type?: StringNullableFilter<"Phone"> | string | null
    observations?: StringNullableFilter<"Phone"> | string | null
  }

  export type PortalPaymentUpsertWithWhereUniqueWithoutCustomerInput = {
    where: PortalPaymentWhereUniqueInput
    update: XOR<PortalPaymentUpdateWithoutCustomerInput, PortalPaymentUncheckedUpdateWithoutCustomerInput>
    create: XOR<PortalPaymentCreateWithoutCustomerInput, PortalPaymentUncheckedCreateWithoutCustomerInput>
  }

  export type PortalPaymentUpdateWithWhereUniqueWithoutCustomerInput = {
    where: PortalPaymentWhereUniqueInput
    data: XOR<PortalPaymentUpdateWithoutCustomerInput, PortalPaymentUncheckedUpdateWithoutCustomerInput>
  }

  export type PortalPaymentUpdateManyWithWhereWithoutCustomerInput = {
    where: PortalPaymentScalarWhereInput
    data: XOR<PortalPaymentUpdateManyMutationInput, PortalPaymentUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PortalPaymentScalarWhereInput = {
    AND?: PortalPaymentScalarWhereInput | PortalPaymentScalarWhereInput[]
    OR?: PortalPaymentScalarWhereInput[]
    NOT?: PortalPaymentScalarWhereInput | PortalPaymentScalarWhereInput[]
    id?: StringFilter<"PortalPayment"> | string
    invoiceId?: BigIntNullableFilter<"PortalPayment"> | bigint | number | null
    customerId?: BigIntFilter<"PortalPayment"> | bigint | number
    asaasPaymentId?: StringFilter<"PortalPayment"> | string
    paymentMethod?: StringFilter<"PortalPayment"> | string
    status?: StringFilter<"PortalPayment"> | string
    invoiceUrl?: StringNullableFilter<"PortalPayment"> | string | null
    bankSlipUrl?: StringNullableFilter<"PortalPayment"> | string | null
    pixCopyPaste?: StringNullableFilter<"PortalPayment"> | string | null
    value?: DecimalFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string
    netValue?: DecimalNullableFilter<"PortalPayment"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"PortalPayment"> | Date | string
    updatedAt?: DateTimeFilter<"PortalPayment"> | Date | string
  }

  export type ChangeRequestUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ChangeRequestWhereUniqueInput
    update: XOR<ChangeRequestUpdateWithoutCustomerInput, ChangeRequestUncheckedUpdateWithoutCustomerInput>
    create: XOR<ChangeRequestCreateWithoutCustomerInput, ChangeRequestUncheckedCreateWithoutCustomerInput>
  }

  export type ChangeRequestUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ChangeRequestWhereUniqueInput
    data: XOR<ChangeRequestUpdateWithoutCustomerInput, ChangeRequestUncheckedUpdateWithoutCustomerInput>
  }

  export type ChangeRequestUpdateManyWithWhereWithoutCustomerInput = {
    where: ChangeRequestScalarWhereInput
    data: XOR<ChangeRequestUpdateManyMutationInput, ChangeRequestUncheckedUpdateManyWithoutCustomerInput>
  }

  export type ChangeRequestScalarWhereInput = {
    AND?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
    OR?: ChangeRequestScalarWhereInput[]
    NOT?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
    id?: IntFilter<"ChangeRequest"> | number
    customerId?: BigIntFilter<"ChangeRequest"> | bigint | number
    type?: EnumChangeTypeFilter<"ChangeRequest"> | $Enums.ChangeType
    oldData?: JsonNullableFilter<"ChangeRequest">
    newData?: JsonFilter<"ChangeRequest">
    status?: EnumRequestStatusFilter<"ChangeRequest"> | $Enums.RequestStatus
    reviewedBy?: StringNullableFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeFilter<"ChangeRequest"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutCustomerInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutCustomerInput, RefreshTokenUncheckedUpdateWithoutCustomerInput>
    create: XOR<RefreshTokenCreateWithoutCustomerInput, RefreshTokenUncheckedCreateWithoutCustomerInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutCustomerInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutCustomerInput, RefreshTokenUncheckedUpdateWithoutCustomerInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutCustomerInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutCustomerInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    customerId?: BigIntFilter<"RefreshToken"> | bigint | number
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type FinancialResponsibleUpsertWithWhereUniqueWithoutPayerInput = {
    where: FinancialResponsibleWhereUniqueInput
    update: XOR<FinancialResponsibleUpdateWithoutPayerInput, FinancialResponsibleUncheckedUpdateWithoutPayerInput>
    create: XOR<FinancialResponsibleCreateWithoutPayerInput, FinancialResponsibleUncheckedCreateWithoutPayerInput>
  }

  export type FinancialResponsibleUpdateWithWhereUniqueWithoutPayerInput = {
    where: FinancialResponsibleWhereUniqueInput
    data: XOR<FinancialResponsibleUpdateWithoutPayerInput, FinancialResponsibleUncheckedUpdateWithoutPayerInput>
  }

  export type FinancialResponsibleUpdateManyWithWhereWithoutPayerInput = {
    where: FinancialResponsibleScalarWhereInput
    data: XOR<FinancialResponsibleUpdateManyMutationInput, FinancialResponsibleUncheckedUpdateManyWithoutPayerInput>
  }

  export type FinancialResponsibleScalarWhereInput = {
    AND?: FinancialResponsibleScalarWhereInput | FinancialResponsibleScalarWhereInput[]
    OR?: FinancialResponsibleScalarWhereInput[]
    NOT?: FinancialResponsibleScalarWhereInput | FinancialResponsibleScalarWhereInput[]
    id?: BigIntFilter<"FinancialResponsible"> | bigint | number
    customerPlanId?: BigIntFilter<"FinancialResponsible"> | bigint | number
    name?: StringFilter<"FinancialResponsible"> | string
    cpfCnpj?: StringFilter<"FinancialResponsible"> | string
    email?: StringNullableFilter<"FinancialResponsible"> | string | null
    phone?: StringNullableFilter<"FinancialResponsible"> | string | null
    payerCustomerId?: BigIntNullableFilter<"FinancialResponsible"> | bigint | number | null
  }

  export type CustomerCreateWithoutPlansInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateWithoutPlansInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerCreateOrConnectWithoutPlansInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPlansInput, CustomerUncheckedCreateWithoutPlansInput>
  }

  export type FinancialResponsibleCreateWithoutPlanInput = {
    id?: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
    payer?: CustomerCreateNestedOneWithoutFinancialResponsibleAsPayerInput
  }

  export type FinancialResponsibleUncheckedCreateWithoutPlanInput = {
    id?: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
    payerCustomerId?: bigint | number | null
  }

  export type FinancialResponsibleCreateOrConnectWithoutPlanInput = {
    where: FinancialResponsibleWhereUniqueInput
    create: XOR<FinancialResponsibleCreateWithoutPlanInput, FinancialResponsibleUncheckedCreateWithoutPlanInput>
  }

  export type InvoiceCreateWithoutPlanInput = {
    id: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
    portalPayments?: PortalPaymentCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutPlanInput = {
    id: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
    portalPayments?: PortalPaymentUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutPlanInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutPlanInput, InvoiceUncheckedCreateWithoutPlanInput>
  }

  export type InvoiceCreateManyPlanInputEnvelope = {
    data: InvoiceCreateManyPlanInput | InvoiceCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutPlansInput = {
    update: XOR<CustomerUpdateWithoutPlansInput, CustomerUncheckedUpdateWithoutPlansInput>
    create: XOR<CustomerCreateWithoutPlansInput, CustomerUncheckedCreateWithoutPlansInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPlansInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPlansInput, CustomerUncheckedUpdateWithoutPlansInput>
  }

  export type CustomerUpdateWithoutPlansInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPlansInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type FinancialResponsibleUpsertWithoutPlanInput = {
    update: XOR<FinancialResponsibleUpdateWithoutPlanInput, FinancialResponsibleUncheckedUpdateWithoutPlanInput>
    create: XOR<FinancialResponsibleCreateWithoutPlanInput, FinancialResponsibleUncheckedCreateWithoutPlanInput>
    where?: FinancialResponsibleWhereInput
  }

  export type FinancialResponsibleUpdateToOneWithWhereWithoutPlanInput = {
    where?: FinancialResponsibleWhereInput
    data: XOR<FinancialResponsibleUpdateWithoutPlanInput, FinancialResponsibleUncheckedUpdateWithoutPlanInput>
  }

  export type FinancialResponsibleUpdateWithoutPlanInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    payer?: CustomerUpdateOneWithoutFinancialResponsibleAsPayerNestedInput
  }

  export type FinancialResponsibleUncheckedUpdateWithoutPlanInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    payerCustomerId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type InvoiceUpsertWithWhereUniqueWithoutPlanInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutPlanInput, InvoiceUncheckedUpdateWithoutPlanInput>
    create: XOR<InvoiceCreateWithoutPlanInput, InvoiceUncheckedCreateWithoutPlanInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutPlanInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutPlanInput, InvoiceUncheckedUpdateWithoutPlanInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutPlanInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutPlanInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: BigIntFilter<"Invoice"> | bigint | number
    planId?: BigIntFilter<"Invoice"> | bigint | number
    dueDate?: DateTimeFilter<"Invoice"> | Date | string
    value?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFilter<"Invoice"> | $Enums.BoletoStatus
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    receivedValue?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    discount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    interest?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    paymentMode?: StringNullableFilter<"Invoice"> | string | null
    bankId?: StringNullableFilter<"Invoice"> | string | null
    ourNumber?: StringNullableFilter<"Invoice"> | string | null
    installment?: StringNullableFilter<"Invoice"> | string | null
    paymentFormId?: IntNullableFilter<"Invoice"> | number | null
  }

  export type CustomerPlanCreateWithoutFinancialResponsibleInput = {
    id: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    customer: CustomerCreateNestedOneWithoutPlansInput
    invoices?: InvoiceCreateNestedManyWithoutPlanInput
  }

  export type CustomerPlanUncheckedCreateWithoutFinancialResponsibleInput = {
    id: bigint | number
    customerId: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    invoices?: InvoiceUncheckedCreateNestedManyWithoutPlanInput
  }

  export type CustomerPlanCreateOrConnectWithoutFinancialResponsibleInput = {
    where: CustomerPlanWhereUniqueInput
    create: XOR<CustomerPlanCreateWithoutFinancialResponsibleInput, CustomerPlanUncheckedCreateWithoutFinancialResponsibleInput>
  }

  export type CustomerCreateWithoutFinancialResponsibleAsPayerInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutFinancialResponsibleAsPayerInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutFinancialResponsibleAsPayerInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutFinancialResponsibleAsPayerInput, CustomerUncheckedCreateWithoutFinancialResponsibleAsPayerInput>
  }

  export type CustomerPlanUpsertWithoutFinancialResponsibleInput = {
    update: XOR<CustomerPlanUpdateWithoutFinancialResponsibleInput, CustomerPlanUncheckedUpdateWithoutFinancialResponsibleInput>
    create: XOR<CustomerPlanCreateWithoutFinancialResponsibleInput, CustomerPlanUncheckedCreateWithoutFinancialResponsibleInput>
    where?: CustomerPlanWhereInput
  }

  export type CustomerPlanUpdateToOneWithWhereWithoutFinancialResponsibleInput = {
    where?: CustomerPlanWhereInput
    data: XOR<CustomerPlanUpdateWithoutFinancialResponsibleInput, CustomerPlanUncheckedUpdateWithoutFinancialResponsibleInput>
  }

  export type CustomerPlanUpdateWithoutFinancialResponsibleInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: CustomerUpdateOneRequiredWithoutPlansNestedInput
    invoices?: InvoiceUpdateManyWithoutPlanNestedInput
  }

  export type CustomerPlanUncheckedUpdateWithoutFinancialResponsibleInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type CustomerUpsertWithoutFinancialResponsibleAsPayerInput = {
    update: XOR<CustomerUpdateWithoutFinancialResponsibleAsPayerInput, CustomerUncheckedUpdateWithoutFinancialResponsibleAsPayerInput>
    create: XOR<CustomerCreateWithoutFinancialResponsibleAsPayerInput, CustomerUncheckedCreateWithoutFinancialResponsibleAsPayerInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutFinancialResponsibleAsPayerInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutFinancialResponsibleAsPayerInput, CustomerUncheckedUpdateWithoutFinancialResponsibleAsPayerInput>
  }

  export type CustomerUpdateWithoutFinancialResponsibleAsPayerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutFinancialResponsibleAsPayerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerPlanCreateWithoutInvoicesInput = {
    id: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    customer: CustomerCreateNestedOneWithoutPlansInput
    financialResponsible?: FinancialResponsibleCreateNestedOneWithoutPlanInput
  }

  export type CustomerPlanUncheckedCreateWithoutInvoicesInput = {
    id: bigint | number
    customerId: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
    financialResponsible?: FinancialResponsibleUncheckedCreateNestedOneWithoutPlanInput
  }

  export type CustomerPlanCreateOrConnectWithoutInvoicesInput = {
    where: CustomerPlanWhereUniqueInput
    create: XOR<CustomerPlanCreateWithoutInvoicesInput, CustomerPlanUncheckedCreateWithoutInvoicesInput>
  }

  export type PortalPaymentCreateWithoutInvoiceInput = {
    id?: string
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutPaymentsInput
  }

  export type PortalPaymentUncheckedCreateWithoutInvoiceInput = {
    id?: string
    customerId: bigint | number
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalPaymentCreateOrConnectWithoutInvoiceInput = {
    where: PortalPaymentWhereUniqueInput
    create: XOR<PortalPaymentCreateWithoutInvoiceInput, PortalPaymentUncheckedCreateWithoutInvoiceInput>
  }

  export type PortalPaymentCreateManyInvoiceInputEnvelope = {
    data: PortalPaymentCreateManyInvoiceInput | PortalPaymentCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type CustomerPlanUpsertWithoutInvoicesInput = {
    update: XOR<CustomerPlanUpdateWithoutInvoicesInput, CustomerPlanUncheckedUpdateWithoutInvoicesInput>
    create: XOR<CustomerPlanCreateWithoutInvoicesInput, CustomerPlanUncheckedCreateWithoutInvoicesInput>
    where?: CustomerPlanWhereInput
  }

  export type CustomerPlanUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: CustomerPlanWhereInput
    data: XOR<CustomerPlanUpdateWithoutInvoicesInput, CustomerPlanUncheckedUpdateWithoutInvoicesInput>
  }

  export type CustomerPlanUpdateWithoutInvoicesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: CustomerUpdateOneRequiredWithoutPlansNestedInput
    financialResponsible?: FinancialResponsibleUpdateOneWithoutPlanNestedInput
  }

  export type CustomerPlanUncheckedUpdateWithoutInvoicesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    financialResponsible?: FinancialResponsibleUncheckedUpdateOneWithoutPlanNestedInput
  }

  export type PortalPaymentUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: PortalPaymentWhereUniqueInput
    update: XOR<PortalPaymentUpdateWithoutInvoiceInput, PortalPaymentUncheckedUpdateWithoutInvoiceInput>
    create: XOR<PortalPaymentCreateWithoutInvoiceInput, PortalPaymentUncheckedCreateWithoutInvoiceInput>
  }

  export type PortalPaymentUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: PortalPaymentWhereUniqueInput
    data: XOR<PortalPaymentUpdateWithoutInvoiceInput, PortalPaymentUncheckedUpdateWithoutInvoiceInput>
  }

  export type PortalPaymentUpdateManyWithWhereWithoutInvoiceInput = {
    where: PortalPaymentScalarWhereInput
    data: XOR<PortalPaymentUpdateManyMutationInput, PortalPaymentUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type CustomerCreateWithoutPaymentsInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateWithoutPaymentsInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerCreateOrConnectWithoutPaymentsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
  }

  export type InvoiceCreateWithoutPortalPaymentsInput = {
    id: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
    plan: CustomerPlanCreateNestedOneWithoutInvoicesInput
  }

  export type InvoiceUncheckedCreateWithoutPortalPaymentsInput = {
    id: bigint | number
    planId: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
  }

  export type InvoiceCreateOrConnectWithoutPortalPaymentsInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutPortalPaymentsInput, InvoiceUncheckedCreateWithoutPortalPaymentsInput>
  }

  export type CustomerUpsertWithoutPaymentsInput = {
    update: XOR<CustomerUpdateWithoutPaymentsInput, CustomerUncheckedUpdateWithoutPaymentsInput>
    create: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPaymentsInput, CustomerUncheckedUpdateWithoutPaymentsInput>
  }

  export type CustomerUpdateWithoutPaymentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPaymentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type InvoiceUpsertWithoutPortalPaymentsInput = {
    update: XOR<InvoiceUpdateWithoutPortalPaymentsInput, InvoiceUncheckedUpdateWithoutPortalPaymentsInput>
    create: XOR<InvoiceCreateWithoutPortalPaymentsInput, InvoiceUncheckedCreateWithoutPortalPaymentsInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutPortalPaymentsInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutPortalPaymentsInput, InvoiceUncheckedUpdateWithoutPortalPaymentsInput>
  }

  export type InvoiceUpdateWithoutPortalPaymentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
    plan?: CustomerPlanUpdateOneRequiredWithoutInvoicesNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutPortalPaymentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    planId?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CustomerCreateWithoutChangeRequestsInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateWithoutChangeRequestsInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerCreateOrConnectWithoutChangeRequestsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutChangeRequestsInput, CustomerUncheckedCreateWithoutChangeRequestsInput>
  }

  export type CustomerUpsertWithoutChangeRequestsInput = {
    update: XOR<CustomerUpdateWithoutChangeRequestsInput, CustomerUncheckedUpdateWithoutChangeRequestsInput>
    create: XOR<CustomerCreateWithoutChangeRequestsInput, CustomerUncheckedCreateWithoutChangeRequestsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutChangeRequestsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutChangeRequestsInput, CustomerUncheckedUpdateWithoutChangeRequestsInput>
  }

  export type CustomerUpdateWithoutChangeRequestsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutChangeRequestsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type CustomerCreateWithoutAddressesInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateWithoutAddressesInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerCreateOrConnectWithoutAddressesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
  }

  export type CustomerUpsertWithoutAddressesInput = {
    update: XOR<CustomerUpdateWithoutAddressesInput, CustomerUncheckedUpdateWithoutAddressesInput>
    create: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutAddressesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutAddressesInput, CustomerUncheckedUpdateWithoutAddressesInput>
  }

  export type CustomerUpdateWithoutAddressesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutAddressesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type CustomerCreateWithoutPhonesInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateWithoutPhonesInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerCreateOrConnectWithoutPhonesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPhonesInput, CustomerUncheckedCreateWithoutPhonesInput>
  }

  export type CustomerUpsertWithoutPhonesInput = {
    update: XOR<CustomerUpdateWithoutPhonesInput, CustomerUncheckedUpdateWithoutPhonesInput>
    create: XOR<CustomerCreateWithoutPhonesInput, CustomerUncheckedCreateWithoutPhonesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPhonesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPhonesInput, CustomerUncheckedUpdateWithoutPhonesInput>
  }

  export type CustomerUpdateWithoutPhonesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPhonesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type CustomerCreateWithoutRefreshTokensInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanCreateNestedManyWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    phones?: PhoneCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleCreateNestedManyWithoutPayerInput
  }

  export type CustomerUncheckedCreateWithoutRefreshTokensInput = {
    id: bigint | number
    fullName: string
    cpfCnpj?: string | null
    email?: string | null
    passwordHash?: string | null
    firstAccess?: boolean
    asaasCustomerId?: string | null
    lastSyncAt?: Date | string
    updatedAt?: Date | string
    plans?: CustomerPlanUncheckedCreateNestedManyWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    phones?: PhoneUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PortalPaymentUncheckedCreateNestedManyWithoutCustomerInput
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutCustomerInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedCreateNestedManyWithoutPayerInput
  }

  export type CustomerCreateOrConnectWithoutRefreshTokensInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutRefreshTokensInput, CustomerUncheckedCreateWithoutRefreshTokensInput>
  }

  export type CustomerUpsertWithoutRefreshTokensInput = {
    update: XOR<CustomerUpdateWithoutRefreshTokensInput, CustomerUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<CustomerCreateWithoutRefreshTokensInput, CustomerUncheckedCreateWithoutRefreshTokensInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutRefreshTokensInput, CustomerUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type CustomerUpdateWithoutRefreshTokensInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUpdateManyWithoutPayerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutRefreshTokensInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstAccess?: BoolFieldUpdateOperationsInput | boolean
    asaasCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: CustomerPlanUncheckedUpdateManyWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    phones?: PhoneUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PortalPaymentUncheckedUpdateManyWithoutCustomerNestedInput
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutCustomerNestedInput
    financialResponsibleAsPayer?: FinancialResponsibleUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerPlanCreateManyCustomerInput = {
    id: bigint | number
    status?: string | null
    hasFinancialResp?: boolean
    sector?: string | null
    quadra?: string | null
    lote?: string | null
  }

  export type AddressCreateManyCustomerInput = {
    id?: number
    street: string
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    isMain?: boolean
  }

  export type PhoneCreateManyCustomerInput = {
    id?: number
    number: string
    type?: string | null
    observations?: string | null
  }

  export type PortalPaymentCreateManyCustomerInput = {
    id?: string
    invoiceId?: bigint | number | null
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChangeRequestCreateManyCustomerInput = {
    id?: number
    type: $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateManyCustomerInput = {
    id?: string
    token: string
    expiresAt: Date | string
  }

  export type FinancialResponsibleCreateManyPayerInput = {
    id?: bigint | number
    customerPlanId: bigint | number
    name: string
    cpfCnpj: string
    email?: string | null
    phone?: string | null
  }

  export type CustomerPlanUpdateWithoutCustomerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    financialResponsible?: FinancialResponsibleUpdateOneWithoutPlanNestedInput
    invoices?: InvoiceUpdateManyWithoutPlanNestedInput
  }

  export type CustomerPlanUncheckedUpdateWithoutCustomerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    financialResponsible?: FinancialResponsibleUncheckedUpdateOneWithoutPlanNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type CustomerPlanUncheckedUpdateManyWithoutCustomerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    hasFinancialResp?: BoolFieldUpdateOperationsInput | boolean
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    quadra?: NullableStringFieldUpdateOperationsInput | string | null
    lote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUpdateWithoutCustomerInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AddressUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AddressUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    street?: StringFieldUpdateOperationsInput | string
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PhoneUpdateWithoutCustomerInput = {
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhoneUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhoneUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    number?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PortalPaymentUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutPortalPaymentsNestedInput
  }

  export type PortalPaymentUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalPaymentUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUpdateWithoutCustomerInput = {
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumChangeTypeFieldUpdateOperationsInput | $Enums.ChangeType
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialResponsibleUpdateWithoutPayerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: CustomerPlanUpdateOneRequiredWithoutFinancialResponsibleNestedInput
  }

  export type FinancialResponsibleUncheckedUpdateWithoutPayerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerPlanId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FinancialResponsibleUncheckedUpdateManyWithoutPayerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    customerPlanId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvoiceCreateManyPlanInput = {
    id: bigint | number
    dueDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    status?: $Enums.BoletoStatus
    paymentDate?: Date | string | null
    receivedValue?: Decimal | DecimalJsLike | number | string | null
    discount?: Decimal | DecimalJsLike | number | string | null
    interest?: Decimal | DecimalJsLike | number | string | null
    paymentMode?: string | null
    bankId?: string | null
    ourNumber?: string | null
    installment?: string | null
    paymentFormId?: number | null
  }

  export type InvoiceUpdateWithoutPlanInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
    portalPayments?: PortalPaymentUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutPlanInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
    portalPayments?: PortalPaymentUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutPlanInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumBoletoStatusFieldUpdateOperationsInput | $Enums.BoletoStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interest?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    ourNumber?: NullableStringFieldUpdateOperationsInput | string | null
    installment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentFormId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PortalPaymentCreateManyInvoiceInput = {
    id?: string
    customerId: bigint | number
    asaasPaymentId: string
    paymentMethod: string
    status: string
    invoiceUrl?: string | null
    bankSlipUrl?: string | null
    pixCopyPaste?: string | null
    value: Decimal | DecimalJsLike | number | string
    netValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalPaymentUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PortalPaymentUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalPaymentUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: BigIntFieldUpdateOperationsInput | bigint | number
    asaasPaymentId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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