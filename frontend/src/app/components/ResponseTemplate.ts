interface Response {
    result: Result;
    token: String;
}

interface Result {
    error: Boolean;
    data: Data[];
}

interface Data {
    id: Number;
}

interface UserInfo {
    id: Number;
    fullname: String;
    username: String;
    email: String;
    password: String;
}

export {Response, Result, Data, UserInfo}