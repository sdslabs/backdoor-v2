export interface HTTPPlainResp {
  message: string;
}

export interface HTTPPlainMapResp {
  messages: Record<string, string>;
}

export interface HTTPErrorResp {
  error: string;
}

export interface HTTPAuthorizeResp {
  token: string;
  role: string;
  message: string;
}
