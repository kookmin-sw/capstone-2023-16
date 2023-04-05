from typing import Dict, List

from graphql_app.domain.statistics.core import get_statistics_from_records
from graphql_app.models import Persona


def get_following_personas_statistics(persona_id: int, result_limit: int) -> Dict[str, List[Dict[str, int]]]:
    following_personas = Persona.objects.filter(following_personas__in=[persona_id]) \
        .values('id',
                'gender',
                'age',
                'job',
                'preferred_tags__body',
                'preferred_categories__body')

    pp_resolver = lambda x: x['id']

    io_labels = {
        'gender': 'gender_scores',
        'age': 'age_scores',
        'job': 'job_scores',
        'preferred_tags__body': 'tag_scores',
        'preferred_categories__body': 'category_scores'
    }

    input_resolvers = {
        'age': lambda age: f"{age // 10 * 10}대"
    }

    statistics = get_statistics_from_records(following_personas, pp_resolver, result_limit,
                                             io_labels, input_resolvers, False)
    return statistics


def get_follower_personas_statistics(persona_id: int, result_limit: int) -> Dict[str, List[Dict[str, int]]]:
    follower_personas = Persona.objects.filter(follower_personas__in=[persona_id]) \
        .values('id',
                'gender',
                'age',
                'job',
                'preferred_tags__body',
                'preferred_categories__body')

    pp_resolver = lambda x: x['id']

    io_labels = {
        'gender': 'gender_scores',
        'age': 'age_scores',
        'job': 'job_scores',
        'preferred_tags__body': 'tag_scores',
        'preferred_categories__body': 'category_scores'
    }

    input_resolvers = {
        'age': lambda age: f"{age // 10 * 10}대"
    }

    statistics = get_statistics_from_records(follower_personas, pp_resolver, result_limit,
                                             io_labels, input_resolvers, False)

    return statistics
