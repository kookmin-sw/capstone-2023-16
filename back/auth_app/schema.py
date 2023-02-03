import graphene

from graphene_django import DjangoObjectType

from .models import User, EmailUser


class UserType(DjangoObjectType):
    class Meta:
        model = User


class EmailRegisterMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    # The class attributes define the response of the mutation
    emailRegister = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, text, id):
        # Create a new user and return it
        return EmailRegisterMutation()


class Mutation(graphene.ObjectType):
    email_register = EmailRegisterMutation.Field()
