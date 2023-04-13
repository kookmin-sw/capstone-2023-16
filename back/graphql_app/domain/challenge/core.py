from graphql_app.models import Challenge, ChallengeObjectiveHistory,ChallengeObjective


def get_all_challenges():
    return Challenge.objects.all()

def get_challenges_by_persona_id(persona_id: int):
    return Challenge.objects.filter(persona_id=persona_id)

def create_challenge_history(challenge_id: int, persona_id: int, is_done: bool):
    return ChallengeObjectiveHistory.objects.create(challenge_id=challenge_id, persona_id=persona_id, is_done=is_done)

def update_challenge_history(challenge_id: int, persona_id: int, is_done: bool):
    return ChallengeObjectiveHistory.objects.filter(challenge_id=challenge_id, persona_id=persona_id).update(is_done=is_done)

def get_challenge_history_by_user_id_and_challenge_id(user_id: int, challenge_id: int):
    return ChallengeObjectiveHistory.objects.filter(challenge_id=challenge_id, persona_id=user_id)

def get_challenge_objects_by_challenge_id(challenge_id: int):
    return ChallengeObjective.objects.filter(challenge_id=challenge_id)
