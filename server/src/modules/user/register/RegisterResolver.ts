import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { RegisterInput } from "./RegisterInput";
import { UserRepository } from "../../repos/UserRepo";
import { InjectRepository } from "typeorm-typedi-extensions";

@Resolver((of) => User)
class RegisterResolver {
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@Query(() => String)
	hello() {
		return "Hello World";
	}

	@Mutation(() => ErrorSchema!, { nullable: true })
	async register(
		@Arg("data") { email, firstName, lastName, password }: RegisterInput
	) {
		const res = await this.userRepository.findByEmailOrCreate({
			email,
			firstName,
			lastName,
			password,
		});

		return res;
	}
}

export default RegisterResolver;
