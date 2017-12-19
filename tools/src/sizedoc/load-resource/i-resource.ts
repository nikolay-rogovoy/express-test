import {Customer} from '../../customer/entity/customer';
import {Customerresource} from '../../customer/entity/customerresource';

export interface IResource {
    customer: Customer;
    customerresources: Customerresource[];
}
