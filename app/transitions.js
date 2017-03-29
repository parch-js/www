export default function () {
  this.setDefault({ duration: 300 });

  this.transition(
    this.fromRoute('index'),
    this.toRoute(['getting-started', 'getting-started.index']),
    this.use('fade')
  );

  this.transition(
    this.fromRoute('getting-started.index'),
    this.toRoute('getting-started.page'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('container_page'),
    this.use('cross-fade')
  );

  this.transition(this.use('fade'));
};
