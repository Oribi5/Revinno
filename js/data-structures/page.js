

class Page {

  static initPages() {

    for ( let classtype in Page.classes ) {
      let instance = new Page.classes[classtype](classtype);
      Page.pageInstances[classtype] = instance;
    }

    console.log(Page.pageInstances);

  }

  static getInstance(type) {
    let key = getKeyFromType(type, pageTypes);
    return Page.pageInstances[key];
  }

  static updatePage(element) {
    let $element = $(element);
    let types = $element.attr("type").split("|");

    let type = types[0];
    let subType = types[1];

    //New Page Set
    if ( type != activePage ) {
      $("li").removeClass("active");
      $element.parent().addClass("active")
    }


    this.activePage = Page.getInstance(subType);
    this.activePage.load(type, subType);

    updateBreadCrumbs(type, subType);
    console.log(`${formatString(type)}: ${formatString(subType)}`);
  }

  constructor(type) {
    this.type = pageTypes[type];
    this.setup();
  }

  load(type, subType) {
    this.jqryObj = $("#page-container");
    this.jqryObj.attr("type", this.type);

    console.log(subType);

    let instance = this;
    this.jqryObj.load(`./pages/${type}/${subType}/${subType}.html`, function(data) {
      console.log("Successful load of "+subType);
      instance.init();
    });
  }

  setup()   {}
  init()    {}
  update()  {}

  clear() {
    this.jqryObj.empty();
  }
}

Page.classes = {};
Page.pageInstances = {};

Page.activePage = null;

Page.classes.Logistics = class Logistics extends Page {
  constructor(type) {
    super(type);
  }
}

Page.classes.PreliminaryDesign = class PreliminaryDesign extends Page {
  constructor(type) {
    super(type);
  }
}

Page.classes.OrderStatus = class OrderStatus extends Page {
  constructor(type) {
    super(type);
  }
}
Page.classes.LiveFeed = class LiveFeed extends Page {
  constructor(type) {
    super(type);
  }
}
Page.classes.Reconstruction = class Reconstruction extends Page {
  constructor(type) {
    super(type);
  }
}
Page.classes.ProductionDashboard = class ProductionDashboard extends Page {
  constructor(type) {
    super(type);
  }
}
Page.classes.Analysis = class Analysis extends Page {
  constructor(type) {
    super(type);
  }
}
