import json
from datetime import datetime
from django.utils import timezone


def str_to_json(json_str):
    json_str = str(json_str).replace("\\", "")
    json_str = str(json_str).replace("\'", "\"")
    return json.loads(json_str)

def convert_date(date):
    date = str(datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fz"))
    return date