from back.graphql_app import models


def get_all_challenges():
    return models.Challenge.objects.all()

def get_challenges_by_user_id(user_id: int):
    return models.Challenge.objects.filter(persona=user_id)

def create_challenge_history(challenge_id: int, persona_id: int, is_done: bool):
    return models.ChallengeHistory.objects.create(challenge_id=challenge_id, persona_id=persona_id, is_done=is_done)

def update_challenge_history(challenge_id: int, persona_id: int, is_done: bool):
    return models.ChallengeHistory.objects.filter(challenge_id=challenge_id, persona_id=persona_id).update(is_done=is_done)

def get_challenge_history_by_user_id_and_challenge_id(user_id: int, challenge_id: int):
    return models.ChallengeHistory.objects.filter(challenge_id=challenge_id, persona_id=user_id)
