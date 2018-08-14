import { action, observable } from 'mobx'
import Form from './Form'

abstract class List<ItemType> extends Form{
  @observable public data:ItemType[] = [];
  @observable public total:number=0;
  @observable public index:number=1;
  @observable public size:number=10;
  @observable public pending:boolean=false;
  @action.bound public search() {
    this.update()
  }
  @action.bound public async update () {
    this.startLoad()
    try {
      const {data, total} = await this.fetch(this.index, this.size)
      this.setData(data, total)
    } finally {
      this.stopLoad()
    }
  }
  @action.bound public next () {
    if (this.index >= (this.total - 1)) { return; }
    this.index += 1;
    this.update()
  }
  @action.bound public prev () {
    if (this.index <= 0) { return; }
    this.index -= 1;
    this.update()
  }
  @action.bound public reset () {
    super.reset();
    this.update();
  }
  protected abstract fetch(index:number, size:number):Promise<{data:ItemType[], total:number}>
  @action.bound private setData (data:ItemType[], total:number) {
    this.data = data;
    this.total = total;
  }
  @action.bound private startLoad () {
    this.pending = true
  }
  @action.bound private stopLoad () {
    this.pending = false
  }
}
export default List