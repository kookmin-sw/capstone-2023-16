from datetime import timedelta, datetime

from graphql_app.models import Challenge, ChallengeObjectiveHistory,ChallengeObjective


def get_all_challenges():
    return Challenge.objects.all()

def get_challenges_by_persona_id(persona_id: int):
    return Challenge.objects.filter(personas__in=[persona_id])

def create_challenge_history(challenge_id: int, persona_id: int, is_done: bool):
    return ChallengeObjectiveHistory.objects.create(challenge_id=challenge_id, persona_id=persona_id, is_done=is_done)

def update_challenge_history(challenge_id: int, persona_id: int, is_done: bool):
    return ChallengeObjectiveHistory.objects.filter(challenge_id=challenge_id, persona_id=persona_id).update(is_done=is_done)

def get_challenge_history_by_user_id_and_challenge_id(user_id: int, challenge_id: int):
    return ChallengeObjectiveHistory.objects.filter(challenge_id=challenge_id, persona_id=user_id)

def get_challenge_objects_by_challenge_id(challenge_id: int, persona_id: int):
    objectives = ChallengeObjective.objects\
        .prefetch_related('challengeobjectivehistory_set')\
        .filter(challenge_id=challenge_id)

    for objective in objectives:
        history = objective.challengeobjectivehistory_set.filter(persona_id=persona_id).first()
        if history:
            duration_type = objective.duration_type.value
            last_done_at = history.last_done_at
            # FIXME: 코드 더 이쁘게 리팩터 해야함
            if duration_type == 'daily':
                objective.is_done = last_done_at < datetime.now() + timedelta(days=1)
            elif duration_type == 'monthly':
                objective.is_done = last_done_at < datetime.now() + timedelta(days=30)
            elif duration_type == 'weekly':
                objective.is_done = last_done_at < datetime.now() + timedelta(days=7)
        else:
            objective.is_done = False

    return objectives
