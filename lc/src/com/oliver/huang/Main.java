package com.oliver.huang;

import java.util.*;

public class Main {
    private static ListNode linkNodes(int[] nums) {
        ListNode dummy = new ListNode(0);
        ListNode head = new ListNode(0);
        head = dummy;
        for (int num : nums) {
            dummy.next = new ListNode(num);
            dummy = dummy.next;
        }
        return head.next;
    }

    public static void main(String[] args) {
        int[] nums = {1,2,2,3};
        for (List<Integer> list : subsetsWithDup(nums)) {
            System.out.println(list.toString());
        }
    }

    public static List<List<Integer>> subsetsWithDup(int[] nums) {
        if (nums.length == 0)
            return new ArrayList();

        Arrays.sort(nums);

        List<List<Integer>> sets = new ArrayList();

        int i = 0;
        while (i < nums.length) {
            if (i == 0 || nums[i] != nums[i-1]) {
                // List<Integer> set = new ArrayList();
                // set.add(nums[i]);
                backtrack(sets, new ArrayList(), nums, i, nums.length - i);
            }
            i++;
        }
        sets.add(new ArrayList());
        return sets;
    }

    public static void backtrack(List<List<Integer>> sets, List<Integer> set, int[] nums, int start, int maxSize) {
        if (set.size() == maxSize) {
            return;
        }
        else {
            for (int i = start; i < nums.length; i++) {
                if (i > start && nums[i] == nums[i-1] && set.size() > 0 && set.get(set.size() - 1) != nums[i])
                    continue;
                set.add(nums[i]);
                sets.add(new ArrayList(set));
                backtrack(sets, set, nums, i + 1, maxSize);
                set.remove(set.size() - 1);
            }
        }
    }
}

class ListNode {
    int val;
    ListNode next;

    public ListNode(int val) {
        this.val = val;
    }
}
