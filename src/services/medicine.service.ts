import { env } from "@/env";

const API_URL = env.API_URL;

interface ServiceOption {
    cache?: RequestCache,
    revalidate?: number
}
interface getMEdicineParams {
    search?: string,
    isFeatured?: boolean,
    page?: string,
    limit?: string
}

export const medicineService = {
    getAllMedicine: async function (params?: getMEdicineParams, option?: ServiceOption) {
        try {
            const url = new URL(`${API_URL}/medicines`);
            if (params) {
                Object.entries(params).forEach(([keyof, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(keyof, value)
                    }
                })
            }
            // console.log(url);

            const config: RequestInit = {};
            if (option?.cache) {
                config.cache = option.cache;
            }
            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate };
            }

            config.next = { ...config.next, tags: ["medicines"] };

            const res = await fetch(url.toString(), config);
            const data = await res.json();

            return { data, error: null }
        } catch (err) {
            return { data: null, error: "Something Went Wrong !" }
        }
    },

    getMedicineById: async function (id: string, option?: ServiceOption) {
        try {
            const url = `${API_URL}/medicines/${encodeURIComponent(id)}`;
            const config: RequestInit = {};
            if (option?.cache) config.cache = option.cache;
            if (option?.revalidate) config.next = { revalidate: option.revalidate };

            config.next = { ...config.next, tags: ["medicines"] };

            const res = await fetch(url, config);
            if (!res.ok) {
                // forward status for caller to handle
                return { data: null, error: `Request failed with status ${res.status}`, status: res.status };
            }
            const json = await res.json();
            return { data: json, error: null, status: res.status };
        } catch (err) {
            console.error("getMedicineById error:", err);
            return { data: null, error: "Something went wrong", status: 500 };
        }

    }
}