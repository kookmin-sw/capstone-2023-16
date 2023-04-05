from datetime import datetime, timedelta


def get_day_before_30_days():
    return datetime.now() - timedelta(days=30)
