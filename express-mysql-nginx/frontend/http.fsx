#r "nuget: FSharp.Data"
#r "nuget: FSharp.Json"
open FSharp.Data
open FSharp.Data.HttpRequestHeaders
open FSharp.Json

let toJson p x =
  match x.Body with
  | Text t -> p(t)
  | _ -> failwith "bytes"

// http://localhost
type Root = JsonProvider<"http://localhost">
Http.Request("http://localhost", httpMethod = "GET") |> toJson Root.Parse

// http://localhost/api/v1/users
type Users = JsonProvider<"http://localhost/api/v1/users">
Http.Request("http://localhost/api/v1/users", httpMethod = "GET") |> toJson Users.Parse
Http.Request("http://localhost/api/v1/users/1", httpMethod = "GET") |> toJson Users.Parse
Http.Request("http://localhost/api/v1/users", httpMethod = "POST", headers = [ ContentType HttpContentTypes.Json ],
  body = TextRequest """{"name": "user1", "email":"user1@example.com", "password":"user1"}""")
|> toJson Users.Parse
Http.Request("http://localhost/api/v1/users/12", httpMethod = "PUT", headers = [ ContentType HttpContentTypes.Json ],
  body = TextRequest """{"name": "user1change", "email":"user1@example.com"}""")
|> toJson Users.Parse
Http.Request("http://localhost/api/v1/users/12", httpMethod = "GET") |> toJson Users.Parse
Http.Request("http://localhost/api/v1/users/12", httpMethod = "DELETE") |> toJson Users.Parse
Http.Request("http://localhost/api/v1/users/12") |> toJson Users.Parse

// type AuthLogin = FSharp.Data.JsonProvider<"http://localhost/api/v1/auth/login">
// http://localhost/api/vi/auth/login
type AuthLogin = { message: string; token: string }
let token =
  Http.Request("http://localhost/api/v1/auth/login", httpMethod = "POST", headers = [ ContentType HttpContentTypes.Json ],
    body = TextRequest """{"email": "taro@example.com", "password":"taro"}""")
  |> toJson Json.deserialize<AuthLogin>
  |> fun x -> x.token
// http://localhost/api/v1/auth/user
type AuthUserData = { id: int; name: string; email: string; iat: int }
type AuthUser = { message:string; user: AuthUserData }
Http.Request("http://localhost/api/v1/auth/user",
  httpMethod = "GET",
  headers = [ Authorization $"Bearer {token}" ])
|> toJson Json.deserialize<AuthUser>

type AuthLogout = { message: string; token: string }
let expiredToken =
  Http.Request("http://localhost/api/v1/auth/logout",
    httpMethod = "DELETE",
    headers = [ Authorization $"Bearer {token}" ])
  |> toJson Json.deserialize<AuthLogout>
  |> fun x -> x.token
type InvalidAccess = { message: string }
Http.Request("http://localhost/api/v1/auth/user",
  httpMethod = "GET",
  headers = [ Authorization $"Bearer {expiredToken}" ])
|> toJson Json.deserialize<InvalidAccess>
