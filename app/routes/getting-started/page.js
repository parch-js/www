import Ember from 'ember';

import tableOfContents from "parch-web/utils/table-of-contents";

const TABLE_OF_CONTENTS = tableOfContents.gettingStarted

export default Ember.Route.extend({
  model(params) {
    const { page } = params;
    const currentPageIndex = TABLE_OF_CONTENTS.findIndex(item => item.page === page);
    const next = currentPageIndex < TABLE_OF_CONTENTS.length ? TABLE_OF_CONTENTS[currentPageIndex + 1] : null;
    const previous = currentPageIndex > 0 ? TABLE_OF_CONTENTS[currentPageIndex - 1] : null;

    return {
      currentPage: TABLE_OF_CONTENTS[currentPageIndex],
      currentPageMarkdown: `getting-started/${page}`,
      nextPage: next,
      previousPage: previous,
      tableOfContents: TABLE_OF_CONTENTS
    }
  }
});
