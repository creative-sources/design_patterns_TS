import fetch from "node-fetch";

class VisitorURL<DataType> {
  constructor(private baseURL: string) {}

  async visit(visitor: (results: DataType[]) => void) {
    let nextURL: string | undefined = this.baseURL;
    do {
      const response = await fetch(nextURL);
      const json: {
          next?: string,
          results: DataType[]
      } = await response.json();
      visitor(json.results);
      nextURL
    } while (nextURL);
  }
}  


