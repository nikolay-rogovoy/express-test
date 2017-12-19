import {IResourceTask} from './i-resource-task';
import {IResource} from './i-resource';

export interface IResourceT {
    resource: IResource;
    resourceTasks: IResourceTask[];
}
