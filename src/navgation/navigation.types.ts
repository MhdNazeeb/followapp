import { JobData } from "../types/JobData";
import { routeNames } from "./Screens";

// navigation.types.ts
export type RouteNames = typeof routeNames;

export type RoutePaths = RouteNames[keyof RouteNames];
export type RootStackParamList = {
    [routeNames.home]: undefined;
    [routeNames?.login]: undefined;
    [routeNames.jobDetails]: { job: JobData };
    [routeNames.search]: undefined;
    [routeNames.main]: undefined;
    [routeNames.signUp]: undefined;




};

export type NavigationProps = {
    navigation: {
        navigate: <T extends keyof RootStackParamList>(
            screen: T,
            params: RootStackParamList[T]
        ) => void;
        goBack: () => void;
    };
};

