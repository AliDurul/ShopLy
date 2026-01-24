export const servicesConfig: IServicesConfig = {
    auth: {
        name: "Auth Service",
        url: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
        healthPath: "/health",
        timeout: 5000,
        retries: 3,
    },
    users: {
        name: "User Service",
        url: process.env.USER_SERVICE_URL || "http://localhost:8002",
        healthPath: "/health",
        timeout: 5000,
        retries: 3,
    },
}

export const getServiceConfig = (serviceName: string): IServiceConfig | undefined => {
    return servicesConfig[serviceName];
}

export interface IServiceConfig {
    name: string;
    url: string;
    healthPath: string;
    timeout: number;
    retries: number;
}

export interface IServicesConfig {
    [key: string]: IServiceConfig;
}