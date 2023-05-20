from json import load
from pandas import json_normalize
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.svm import SVC
from sklearn.metrics import precision_recall_fscore_support

RANDOM_STATE = 100

with open('../results/articles.json', 'r', encoding='utf-8') as f:
    articles = load(f)
articles_df = json_normalize(articles['articles'])

X_articles = articles_df.loc[:, ['title', 'text', 'author', 'description']]
y_articles = articles_df.loc[:, 'category']

X_articles['full_data'] = X_articles.apply(
    lambda row: row['title']+row['text']+row['author']+row['description'], axis=1)
X_train, X_test, y_train, y_test = train_test_split(
    X_articles, y_articles, test_size=0.25, random_state=RANDOM_STATE)

classifier = make_pipeline(TfidfVectorizer(stop_words='english'),
                           GridSearchCV(estimator=SVC(),
                                        param_grid={
                               'kernel': ['linear', 'rbf'],
                               'C': [1, 5, 10, 15, 25, 50, 100],
                               'gamma': ['scale', 'auto', 1, 5, 10, 15, 25, 50, 100]}))

classifier.fit(X_train['full_data'], y_train)
y_pred = classifier.predict(X_test['full_data'])
y_true = y_test.tolist()

precision, recall, fscore, support = precision_recall_fscore_support(
    y_true, y_pred, average='micro')

print(f'Точность: {precision}')
print(f'Полнота: {recall}')
print(f'F-мера: {fscore}')
