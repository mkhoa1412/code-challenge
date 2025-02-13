import {
    AwilixContainer,
    createContainer,
    Resolver,
    ResolveOptions,
    ContainerOptions,
} from "awilix";

interface ContainerDefinition {
    [key: string]: Resolver<unknown>
}

export type ExtractResolverType<T> = T extends Resolver<infer X> ? X : null;

export interface TypedAwilixContainer<T extends ContainerDefinition>
    extends Pick<AwilixContainer, Exclude<keyof AwilixContainer, "resolve" | "cradle">> {
    resolve<K extends keyof T>(
        key: K | string,
        resolveOptions?: ResolveOptions
    ): ExtractResolverType<T[K]>;
    cradle: {
        [K in keyof T]: ExtractResolverType<T[K]>;
    }
}

export function createTypedContainer<T extends ContainerDefinition>(
    registrations: T,
    opts?: ContainerOptions
): TypedAwilixContainer<T> {
    return createContainer(opts).register(registrations) as any;
}