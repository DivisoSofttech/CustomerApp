import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class SearchHistoryService {

    searchTerms: String[] = [];
    observableSearchTerms: BehaviorSubject<String[]>;

    constructor(
        private storage: Storage
    ) {
        this.observableSearchTerms = new BehaviorSubject<String[]>(this.searchTerms);
        this.storage.keys()
            .then(data => {
                if (!data.includes('search')) this.storage.set('search', []);
                else {
                    this.storage.get('search')
                        .then(values => {
                            this.observableSearchTerms.next(values);
                        });
                }
            })
    }

    refresh(data) {
        this.observableSearchTerms.next(data);
        this.storage.set('search', data);
    }

    addSearchTerm(term) {
        this.storage.get('search')
            .then(data => {
                if (!data.includes(term)) {
                    data.push(term);
                    this.refresh(data);
                }
            })
    }

    async findAllSearchTerms(term) {
        return await this.storage.get('search')
            .then(data => {
                const matcher = new RegExp(`^${term}`, 'gi');
                const res: String[] = data.filter(word => word.match(matcher));
                if (res.length > 5) {
                    return res.slice(0, 5)
                } else {
                    return res;
                }
            })
    }

}
