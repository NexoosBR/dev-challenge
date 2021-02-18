import RequesterAddress from '../infra/typeorm/entities/RequesterAddress';
import RequesterPhone from '../infra/typeorm/entities/RequesterPhone';

export default interface ICreateRequesterDTO {
  companyName: string;
  cnpj: string;
  addresses: RequesterAddress[];
  phones: RequesterPhone[];
}
