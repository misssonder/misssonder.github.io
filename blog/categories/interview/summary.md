---
title: JAVA面试的一些汇总

date: '2021-04-14 23:45:00'

sidebar: 'auto'

categories:
- 面试

tags:
- 数据库
- 面试
- Java
---
# JAVA

## JVM

## hashcode

- hashCode的存在主要是用于查找的快捷性
- 如果equals相同hashcode也相同，hashcode相

- final 修饰的类不可被继承
- final 修饰的方法不能被重写
- final 修饰的变量一开始必须赋值，且不能被修改

## 基础数据类型

```java
byte short int long double float char boolean 
```

## 字符串类

- String 申明的是不可变的变量
- StringBuffer 申明的是可变的变量、线程不安全
- StringBuilder 申明的是可变的变量、线程不安全

## 抽象类和接口

### 相似

- 接口和抽象类**都不能被实例化**，它们都位于继承树的顶端，用于被其他类实现和继承。
- 接口和抽象类都可以包含抽象方法，实现接口或继承抽象类的类都必须实现这些**抽象方法**。

### 不同

- 接口**不能为普通方法提供方法体**
- 抽象类中的成员变量可以是各种类型的，而接口中的成员变量只能是 **public static final** 类型的
- 接口不能包含构造器，抽象类可以包含**构造器**
- 一个类只能继承一个抽象类，而一个类却可以实现多个接口

## 普通类和抽象类

- 普通类不能有抽象方法

- 抽象类不能直接实例化

## 流

// TODO

## Spring

### AOP

#### 实现

- Spring AOP 是基于动态代理技术来实现的
- Spring AOP 通过 JDK 或 CGLib 的动态代理技术，将横切代码动态织入到目标类的方法前后，并生成一个代理对象，用这个织入了横切逻辑后的代理对象充当目标对象供我们使用。

## 设计模式

### 单例模式

- 指一个类只有一个实例，且该类能自行创建这个实例的一种模式。例如，Windows 中只能打开一个任务管理器，这样可以避免因打开多个任务管理器窗口而造成内存资源的浪费，或出现各个窗口显示内容的不一致等错误。

### 工厂模式

- 定义一个创建产品对象的工厂接口，将产品对象的实际创建工作推迟到具体子工厂类当中。这满足创建型模式中所要求的“创建与
  使用相分离”的特点。

### 代理模式

- 由于某些原因需要给某对象提供一个代理以控制对该对象的访问。这时，访问对象不适合或者不能直接引用目标对象，代理对象作为访问对象和目标对象之间的中介。

> 静态代理，其中WeddingCompany代理了You
>
> ``` java
> package proxy;
> 
> public class StaticProxy {
>  public static void main(String[] args) {
>      WeddingCompany weddingCompany = new WeddingCompany(new You());
>      weddingCompany.happyMarry();
>  }
> }
> interface Marry{
> void happyMarry();
> }
> class You implements Marry{
>  @Override
>  public void happyMarry() {
>      System.out.println("结婚");
>  }
> }
> class WeddingCompany implements Marry{
>  private Marry target;
> 
>  public WeddingCompany(Marry target) {
>      this.target = target;
>  }
> 
>  @Override
>  public void happyMarry() {
>      before();
>      this.target.happyMarry();
>      after();
>  }
> 
>  private void after() {
>      System.out.println("结婚后");
>  }
> 
>  private void before() {
>      System.out.println("结婚前");
>  }
> 
> }
> 
> ```
>
>

### 职责链模式

- 为了避免请求发送者与多个请求处理者耦合在一起，于是将所有请求的处理者通过前一对象记住其下一个对象的引用而连成一条链；当有请求发生时，可将请求沿着这条链传递，直到有对象处理它为止。

### 策略模式

- 该模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。

## 多线程

### 实现

> 在*java*中要想实现多线程，有两种手段，一种是继续*Thread*类，另外一种是实现*Runable*接口


- 继承Thread

~~~ java
class Thread1 extends Thread{
	private String name;
    public Thread1(String name) {
       this.name=name;
    }
	public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(name + "运行  :  " + i);
            try {
                sleep((int) Math.random() * 10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
       
	}
}
public class Main {
 
	public static void main(String[] args) {
		Thread1 mTh1=new Thread1("A");
		Thread1 mTh2=new Thread1("B");
		mTh1.start();
		mTh2.start();
 
	}
 
}
~~~

- 实现Runnable

~~~ java
package com.multithread.runnable;
class Thread2 implements Runnable{
	private String name;
 
	public Thread2(String name) {
		this.name=name;
	}
 
	@Override
	public void run() {
		  for (int i = 0; i < 5; i++) {
	            System.out.println(name + "运行  :  " + i);
	            try {
	            	Thread.sleep((int) Math.random() * 10);
	            } catch (InterruptedException e) {
	                e.printStackTrace();
	            }
	        }
		
	}
	
}
public class Main {
 
	public static void main(String[] args) {
		new Thread(new Thread2("C")).start();
		new Thread(new Thread2("D")).start();
	}
 
}

~~~

- Callable

``` java
import java.util.concurrent.*;

public class TestCallable implements Callable<String> {
    private String name;
    public TestCallable(String name){
        this.name=name;
    }
    @Override
    public String call() throws Exception {
        for (int i = 0; i < 100; i++) {
            System.out.println(name+"-->"+i);
        }
        return name;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        TestCallable a = new TestCallable("A");
        TestCallable b = new TestCallable("B");
        TestCallable c = new TestCallable("C");
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        Future<String> submitA = executorService.submit(a);
        Future<String> submitB = executorService.submit(b);
        Future<String> submitC = executorService.submit(c);
        System.out.println(submitA.get());
        System.out.println(submitB.get());
        System.out.println(submitC.get());
        executorService.shutdown();
    }
}

```

### 线程同步

> 队列+锁
>
> synchronized关键字
>
> + 性能问题
>
>

### 线程池

~~~ java
//五个参数的构造函数
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue)

//六个参数的构造函数-1
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory)

//六个参数的构造函数-2
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          RejectedExecutionHandler handler)

//七个参数的构造函数
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler)

~~~



- **int corePoolSize**  =>  该线程池中**核心线程数最大值**

  > **核心线程：**
  >
  > 线程池新建线程的时候，如果当前线程总数小于corePoolSize，则新建的是核心线程，如果超过corePoolSize，则新建的是非核心线程
  >
  > 核心线程默认情况下会一直存活在线程池中，即使这个核心线程啥也不干(闲置状态)。
  >
  > 如果指定ThreadPoolExecutor的allowCoreThreadTimeOut这个属性为true，那么核心线程如果不干活(闲置状态)的话，超过一定时间(时长下面参数决定)，就会被销毁掉
  >
  > 很好理解吧，正常情况下你不干活我也养你，因为我总有用到你的时候，但有时候特殊情况(比如我自己都养不起了)，那你不干活我就要把你干掉了

- **int maximumPoolSize**

  > 该线程池中**线程总数最大值**
  > 线程总数 = 核心线程数 + 非核心线程数。核心线程在上面解释过了，这里说下非核心线程：
  >
  > 不是核心线程的线程

- **long keepAliveTime**

  > 该线程池中**非核心线程闲置超时时长**
  >
  > 一个非核心线程，如果不干活(闲置状态)的时长超过这个参数所设定的时长，就会被销毁掉
  >
  > 如果设置allowCoreThreadTimeOut = true，则会作用于核心线程

- **TimeUnit unit**

  > keepAliveTime的单位，TimeUnit是一个枚举类型，其包括：
  >
  > 1. NANOSECONDS ： 1微毫秒 = 1微秒 / 1000
  > 2. MICROSECONDS ： 1微秒 = 1毫秒 / 1000
  > 3. MILLISECONDS ： 1毫秒 = 1秒 /1000
  > 4. SECONDS ： 秒
  > 5. MINUTES ： 分
  > 6. HOURS ： 小时
  > 7. DAYS ： 天

- **阻塞队列**

  > 该线程池中的任务队列：维护着等待执行的Runnable对象
  >
  > 当所有的核心线程都在干活时，新添加的任务会被添加到这个队列中等待处理，如果队列满了，则新建非核心线程执行任务
  >
  > 常用的workQueue类型：
  >
  > 1. **SynchronousQueue：**这个队列接收到任务的时候，会直接提交给线程处理，而不保留它，如果所有线程都在工作怎么办？那就新建一个线程来处理这个任务！所以为了保证不出现<线程数达到了maximumPoolSize而不能新建线程>的错误，使用这个类型队列的时候，maximumPoolSize一般指定成Integer.MAX_VALUE，即无限大
  > 2. **LinkedBlockingQueue：**这个队列接收到任务的时候，如果当前线程数小于核心线程数，则新建线程(核心线程)处理任务；如果当前线程数等于核心线程数，则进入队列等待。由于这个队列没有最大值限制，即所有超过核心线程数的任务都将被添加到队列中，这也就导致了maximumPoolSize的设定失效，因为总线程数永远不会超过corePoolSize
  > 3. **ArrayBlockingQueue：**可以限定队列的长度，接收到任务的时候，如果没有达到corePoolSize的值，则新建线程(核心线程)执行任务，如果达到了，则入队等候，如果队列已满，则新建线程(非核心线程)执行任务，又如果总线程数到了maximumPoolSize，并且队列也满了，则发生错误
  > 4. **DelayQueue：**队列内元素必须实现Delayed接口，这就意味着你传进去的任务必须先实现Delayed接口。这个队列接收到任务时，首先先入队，只有达到了指定的延时时间，才会执行任务

- **ThreadFactory threadFactory**

  > 创建线程的方式，这是一个接口，你new他的时候需要实现他的`Thread newThread(Runnable r)`方法，一般用不上，**这是星期六，休息**
  >
  >
  >
  > 小伙伴应该知道AsyncTask是对线程池的封装吧？那就直接放一个AsyncTask新建线程池的threadFactory参数源码吧：
  >
  >
  >
  > ```cpp
  > new ThreadFactory() {
  >  private final AtomicInteger mCount = new AtomicInteger(1);
  > 
  >  public Thread new Thread(Runnable r) {
  >      return new Thread(r,"AsyncTask #" + mCount.getAndIncrement());
  >  }
  > }
  > ```
  >
  > 这么简单？就给线程起了个名？！对啊，所以说这是星期六啊，别管他了，虽然我已经强迫你们看完了...

- **RejectedExecutionHandler handler**

  > 这玩意儿就是抛出异常专用的，比如上面提到的两个错误发生了，就会由这个handler抛出异常，你不指定他也有个默认的
  >
  > 抛异常能抛出什么花样来？所以这个星期天不管了，一边去，根本用不上

新建一个线程池的时候，一般只用5个参数的构造函数。

### JUC

> java.util.concurrent

+ Lock

### 生产者消费者

``` java
package PC;

public class TestPC {
    public static void main(String[] args) {
        Data data = new Data();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.increment();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"A").start();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.decrement();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"B").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.increment();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"C").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.decrement();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"D").start();
    }
}
//判断等待，业务，通知
class Data{
    private int number =0;
    //+1
    public synchronized void increment() throws InterruptedException {
        while  (number!=0){
            //等待
            this.wait();
        }
        number++;
        System.out.println(Thread.currentThread().getName()+"-->"+number);
        //唤醒
        this.notifyAll();

    }
    //-1
    public synchronized void decrement() throws InterruptedException {
        while  (number==0){
            //等待
            this.wait();
        }
        number--;
        System.out.println(Thread.currentThread().getName()+"-->"+number);
        //唤醒
        this.notifyAll();
    }
}

```



> 新版消费者生产者

``` java
package PC;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class TestPC2 {
    public static void main(String[] args) {
        Data2 data = new Data2();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.increment();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"A").start();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.decrement();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"B").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.increment();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"C").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    data.decrement();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"D").start();
    }
}
//判断等待，业务，通知
class Data2{
    private int number =0;
    Lock lock = new ReentrantLock();
    Condition condition = lock.newCondition();;

    //+1
    public  void increment() throws InterruptedException {
        lock.lock();
        try {
            while  (number==4){
                //等待
                condition.await();
            }
            number++;
            System.out.println(Thread.currentThread().getName()+"-->"+number);
            //唤醒
            condition.signalAll();
        }finally {
            lock.unlock();
        }


    }
    //-1
    public  void decrement() throws InterruptedException {
        lock.lock();
        try {
            while  (number==0){
                //等待
                condition.await();

            }
            number--;
            System.out.println(Thread.currentThread().getName()+"-->"+number);
            //唤醒
            condition.signalAll();
        }finally {
            lock.unlock();
        }
    }
}
```



# 数据库

## MYSQL

- 底层是b+tree
- [什么是B+Tree](https://www.bilibili.com/video/BV1DE411i77d?from=search&seid=14339293686760944793)
- [索引详解](https://zhuanlan.zhihu.com/p/113917726)
- ![preview](https://pic2.zhimg.com/v2-ee2277c868c80bac6d3526e647de8e41_r.jpg)

### InnoDB

- 默认索引聚集索引

### MyiSam

- 默认索引为非聚集索引

### 并发事务带来的问题

- 更新丢失（Lost Update）：当两个或多个事务选择同一行，然后基于最初选定的值更新该行时，由于每个事务都不知道其他事务的存在，就会发生丢失更新问题 －－**最后的更新覆盖了由其他事务所做的更新**。例如，两个编辑人员制作了同一 文档的电子副本。每个编辑人员独立地更改其副本，然后保存更改后的副本，这样就覆盖了原始文档。 最后保存其更改副本的编辑人员覆盖另一个编辑人员所做的更改。如果在一个编辑人员完成并提交事务之前，另一个编辑人员不能访问同 一文件，则可避免此问题。
- 脏读（Dirty Reads）：一个事务正在对一条记录做修改，在这个事务完成并提交前， 这条记录的数据就处于不一致状态； 这时， 另一个事务也来读取同一条记录，如果不加控制，第二个事务读取了这些“脏”数据，并据此做进一步的处理，就会产生未提交的数据依赖关系。这种现象被形象地叫做"脏读"。
- 不可重复读（Non-Repeatable Reads）：一个事务在读取某些数据后的某个时间，再次读取以前读过的数据，却发现其读出的数据已经发生了改变、或某些记录已经被删除了！这种现象就叫做“不可重复读” 。
- 幻读 （Phantom Reads）： 一个事务按相同的查询条件重新读取以前检索过的数据，却发现其他事务插入了满足其查询条件的新数据，这种现象就称为“幻读” 。

####  幻读和不可重复读的区别

- 不可重复读的重点是修改：在同一事务中，同样的条件，**第一次读的数据和第二次读的数据不一样**。（因为中间有其他事务提交了修改）
- 幻读的重点在于新增或者删除：在同一事务中，同样的条件，**第一次和第二次读出来的记录数不一样**。（因为中间有其他事务提交了插入/删除）

## Redis

- 数据结构 String List Hash Set Zset

```shell
string : set get del
list: : lpush lpop rpush rpop lrange
set : sadd srem smembers
hash : hset hget hgetall
zset : zadd zrange zscore
```

# 操作系统

## 线程

## 进程

# 计算机网络

## TCP和UDP

### TCP、UDP区别

TCP 是可靠通信协议， 而 UDP 是不可靠通信协议。

UDP可以重传，TCP不可以

> TCP作为一种可靠传输控制协议，其**核心思想**：既要保证数据可靠传输，又要提高传输的效率，而用**三次恰恰可以满足以上两方面的需求！**

A <-------> B

### TCP三次握手

**如果是四次握手的过程：**

**1.1** A 发送同步信号**SYN** + **A's Initial sequence number**

**1.2** B 确认收到A的同步信号，并记录 A's ISN 到本地，命名 **B's ACK sequence number**

**1.3** B发送同步信号**SYN** + **B's Initial sequence number**

**1.4** A确认收到B的同步信号，并记录 B's ISN 到本地，命名 **A's ACK sequence number**

很显然1.2和1.3 这两个步骤可以合并，**只需要三次握手，**可以提高连接的速度与效率。

**如果是二次握手的过程：**

**2.1** A 发送同步信号**SYN** + **A's Initial sequence number**

**2.2** B发送同步信号**SYN** + **B's Initial sequence number** + **B's ACK sequence number**

这里有一个问题，A与B就A的初始序列号达成了一致，这里是1000。**但是**B无法知道A是否已经接收到自己的同步信号，如果这个同步信号丢失了，**A和B就B的初始序列号将无法达成一致。**



## WebSocket

1.  建立在 TCP 协议之上，服务器端的实现比较容易。
2.  与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
3.  数据格式比较轻量，性能开销小，通信高效。
4.  可以发送文本，也可以发送二进制数据。
5.  没有同源限制，客户端可以与任意服务器通信。
6.  协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。


