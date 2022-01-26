from dateutil.parser import isoparser
from pytz import timezone
import re
from datetime import datetime
from transliterate import translit

re_date = re.compile(r'.*(\d\d\d\d-\d\d-\d\d.*)$')
time_string = "DAY_OF_MONTH MONTH_LONG YEAR_LONG г., HOUR_24:MINUTE"


def save(fn, text):
    with open(f'../docs/content/{fn}', 'w') as f:
        f.write(text)


def initialize(title, date):
    m = re.match(re_date, date)
    if not m:
        date = datetime.now(timezone('Europe/Moscow'))
        date = date.isoformat()[:10]
    ln = f'{date}-{distill(title)}.md'
    fn = f'../docs/content/{ln}'
    with open(fn, 'w') as file:
        file.write(f'# {title}\n\n<p class="text-end time-holder"><time>{date}</time></p>\n\n\n')
    return '#' + ln


def distill(value):
    return translit(value, 'ru', reversed=True).lower().strip() \
            .replace(' ', '-')  \
            .replace(',', '')   \
            .replace('?', '')   \
            .replace('!', '')   \
            .replace('@', '')   \
            .replace(':', '')   \
            .replace(';', '')   \
            .replace('"', '')   \
            .replace("'", '')   \
            .replace("«", '')   \
            .replace("»", '')   \
            .replace("...", '') \
            .replace('.', '-')

