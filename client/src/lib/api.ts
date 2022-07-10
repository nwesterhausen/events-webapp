function Api(endpoint: string, method: 'POST' | 'DELETE' | 'PUT' | 'GET' | 'HEAD', data?: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    fetch(endpoint, options)
      .then((resp) => {
        if (resp.ok) {
          return resolve(resp.json());
        }
        if (resp.status === 400 || resp.status === 401) {
          return resp.json();
        }
        console.error(resp);
        throw new Error('bad response');
      })
      .then((data) => {
        console.warn(data);
        return resolve(data);
      })
      .catch(reject);
  });
}
export function Create(endpoint: string, data: any): Promise<any> {
  return Api(endpoint, 'POST', data);
}

export function Delete(endpoint: string, data: any): Promise<any> {
  return Api(endpoint, 'DELETE', data);
}

export function DeleteById(endpoint: string, idNum: number): Promise<any> {
  return Delete(endpoint, { id: idNum });
}

export function Get(endpoint: string): Promise<any> {
  return Api(endpoint, 'GET');
}

export function GetById(endpoint: string, id: number): Promise<any> {
  return Get(`${endpoint}/${id}`);
}
