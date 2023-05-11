/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const someHost = "https://examples.cloudflareworkers.com/demos";
        const url = new URL(request.url)
        const params = url.searchParams
        var link = decodeURI(params.get("link"))
        console.log(link)


        const init = {
            headers: {
                "content-type": "text/html;charset=UTF-8",
            },
        };

        let response = await fetch(link, init)
        response = new Response(response.body, response)
        response.headers.set("Access-Control-Allow-Origin", "*")
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        return response
    },
};
