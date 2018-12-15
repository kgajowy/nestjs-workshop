import { ApiModelProperty } from '@nestjs/swagger';

// Entity - co w DB
// Model - na czym operujemy w ramach servera ?
// interface nie - bo swagger wymaga klas do adnotacji
export class UserModel {

  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  password?: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  roles?: string[];
  data?: any;
}
