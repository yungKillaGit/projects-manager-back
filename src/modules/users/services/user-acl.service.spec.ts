import { Test, TestingModule } from "@nestjs/testing";
import { Action } from "@shared/acl/action.constant";

import { ROLE } from "../../../auth/constants/role.constant";
import { UserAclService } from "./user-acl.service";

describe('UserAclService', () => {
  let service: UserAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAclService],
    }).compile();

    service = module.get<UserAclService>(UserAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('for admin users', () => {
    let userAcl;
    beforeEach(async () => {
      const user = {
        id: 6,
        username: 'admin',
        roles: [ROLE.ADMIN],
      };
      userAcl = service.forActor(user);
    });

    it('should allow admin users to create, read, update, delete, list users', async () => {
      expect(userAcl.canDoAction(Action.Create)).toBeTruthy();
      expect(userAcl.canDoAction(Action.Read)).toBeTruthy();
      expect(userAcl.canDoAction(Action.Update)).toBeTruthy();
      expect(userAcl.canDoAction(Action.Delete)).toBeTruthy();
      expect(userAcl.canDoAction(Action.List)).toBeTruthy();
    });

    it('should allow admin to read, update, delete any users', () => {
      const otherUser = {
        id: 7,
      };
      expect(userAcl.canDoAction(Action.Read, otherUser)).toBeTruthy();
      expect(userAcl.canDoAction(Action.Update, otherUser)).toBeTruthy();
      expect(userAcl.canDoAction(Action.Delete, otherUser)).toBeTruthy();
    });
  });

  describe('for users role', () => {
    let user;
    let userAcl;

    beforeEach(async () => {
      user = {
        id: 11,
        username: 'jeo',
        roles: [ROLE.USER],
      };
      userAcl = service.forActor(user);
    });

    it('should allow users to read, update himself', async () => {
      expect(userAcl.canDoAction(Action.Read, user)).toBeTruthy();
      expect(userAcl.canDoAction(Action.Update, user)).toBeTruthy();
    });

    it('should not allow users to delete himself', async () => {
      expect(userAcl.canDoAction(Action.Delete, user)).toBeFalsy();
    });

    it('should allow users to read other users', () => {
      const otherUser = {
        id: 7,
      };
      expect(userAcl.canDoAction(Action.Read, otherUser)).toBeTruthy();
    });

    it('should not allow users to update, delete other users', () => {
      const otherUser = {
        id: 7,
      };
      expect(userAcl.canDoAction(Action.Update, otherUser)).toBeFalsy();
      expect(userAcl.canDoAction(Action.Delete, otherUser)).toBeFalsy();
    });
  });
});
