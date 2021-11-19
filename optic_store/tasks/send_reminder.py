import frappe;
from datetime import datetime, timezone, timedelta, date

LOCAL_TZ = datetime.now().astimezone().tzinfo

SECS_PER_HOUR = 60 * 60
SECS_PER_DAY = 24 * SECS_PER_HOUR

DAYS_AHEAD = 1

DAY_AHEAD_SEC = DAYS_AHEAD * SECS_PER_DAY
CHECKING_INTERVAL_SEC = SECS_PER_HOUR    # Hourly
# CHECKING_INTERVAL_SEC = 86400

# The time range to trigger
# If check daily => 0 .. DAY_AHEAD_SEC
# If check hourly  => (DAY_AHEAD_SEC - 3600) .. DAY_AHEAD_SEC
TIME_RANGE_MIN = DAY_AHEAD_SEC - CHECKING_INTERVAL_SEC
TIME_RANGE_MAX = DAY_AHEAD_SEC

def process():
    today = date.today()
    tomorrow = today + timedelta(days = DAYS_AHEAD)
    print(today, tomorrow)
    events = frappe.get_list('Event', filters = {"starts_on": ["between",  (today, tomorrow)], "status": 'Open'})
    print('{} events found'.format(len(events)))
    count = 0
    for e in events:
        if process_event(e['name']):
            count += 1
    return count


def get_participant(doctype: str, docname: str):
    return frappe.get_doc(doctype, docname)


def process_event(e: str):
    evt = frappe.get_doc('Event', e)
    start_time = evt.starts_on.replace(tzinfo=LOCAL_TZ)
    span = (start_time - datetime.now().astimezone()).total_seconds()
    if span >= TIME_RANGE_MIN and span <= TIME_RANGE_MAX:
        print("Event {} qualifies start_time={} span={}s".format(evt.name, evt.starts_on, span))
        # print(evt.event_participants)
        receipients = []
        for p in evt.event_participants:
            doc = get_participant(p.reference_doctype, p.reference_docname)
            if doc.email_id:
                print(doc.email_id)

        return True
    return False


