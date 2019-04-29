import { Attractor } from './Attractor';

export class RecursiveAttractor extends Attractor {
  draw(template, iterations = 8) {
    this.clear();
    const base = template.base.clone();
    base.color = 'black';
    this.recurse(base, template.export(), iterations);
  }

  recurse(shape, transformations, iterations, count = 0) {
    if (count === iterations) {
      shape.drawBody(this.context);
    } else {
      for (const transformation of transformations) {
        transformation.decorate(this.context, () => {
          this.recurse(shape, transformations, iterations, count + 1);
        });
      }
    }
  }

  clear() {
    const { context, canvas } = this;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}
